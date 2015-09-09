/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Firebase = require('firebase');

var {
  AppRegistry,
  Image,
  ListView,ScrollView,TouchableHighlight, 
  StyleSheet,
  Text,
  View,
} = React;

var result = [];
var voted = [];
var API_KEY = '';
var API_URL = 'https://dazzling-fire-2808.firebaseio.com/Alphas.json';
var newPost;
var casts;
var votes = 3;
var PAGE_SIZE = 3;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
    
var arr = [];
var rankAlpha = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
    this.setState({ votes:3,
            voted:[],
            data: [],});
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done(
    );
      
  },

  render: function() {
    if (!this.state.loaded) {

      return this.renderLoadingView();
    
    }
    return (
       
       <ScrollView
        automaticallyAdjustContentInsets={false}
        >  
        <View style={styles.header}>
        <Text style={styles.headerTxt}>FAVORITE LETTERS</Text>
        </View>
      <ListView
        dataSource={this.state.dataSource}
        automaticallyAdjustContentInsets={false}
        renderRow={this.renderAlpha}
        style={styles.listView}
      /> 
        <View style={styles.voteHere}>
        <Text style={styles.headerTxt}>CAST A VOTE ({this.state.votes} LEFT)</Text>
        </View>
        <ListView
        dataSource={this.state.dataSource}
        automaticallyAdjustContentInsets={false}
        renderRow={this.renderBeta}
        style={styles.listView}
      /> 
        </ScrollView>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },

  _votes: function(alpha: string) {
    var value = 0;
      var i = 0;
      while(i<voted.length){
        console.log('works');
            if(voted[i] == alpha.Name){
          value++;
            }
            i++;
        }
    return value;
  },
_pressPush: function(alpha: string, casts: number) {
    
    if(votes > 0){

    alpha.Value = alpha.Value + 1;
    
    var usersRef = new Firebase("https://dazzling-fire-2808.firebaseio.com/Alphas");
   var hopperRef = usersRef.child(alpha.Name);
hopperRef.update({
  "Value": alpha.Value
});
    votes--;
        this.setState({votes: this.state.votes - 1});
        this.getInitialState();
        this.setState({dataSource: this.state.dataSource});
       
        this.setState({voted: voted.push(alpha.Name)});
        this.fetchData();
        console.log(this.state.dataSource);
    }else{
console.log('Out of Votes')
}
  },
      _pressPop: function(alpha: string, casts: number) {
      var i = 0;
        while(i<voted.length){
        console.log('works');
            if(voted[i] == alpha.Name){
            //voted.pop[i];
                this.setState({voted: voted.splice(i, 1)});
                
                break;
            }
            i++;
        }
      
      
      },
          
          


  renderAlpha: function(alpha) {
      //console.log(alpha);
    return (
      <View style={styles.container}>
     
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{alpha.Name}</Text>
         <View style={styles.votes}><Text style={styles.year}>{alpha.Value}</Text><Text style={styles.year}> Votes</Text></View>
        </View>
      </View>
    );
  },renderBeta: function(alpha, rowID: number) {
      
    
    return (
      <View style={styles.container}>
     
        <View style={styles.rightContainer}>
          <Text style={styles.titleVote}>{alpha.Name}</Text>
         <View style={styles.voting}>
        <Text style={{margin:4}}>{this._votes(alpha)}</Text>
        <TouchableHighlight
        onPress={() => this._pressPush(alpha)}
        underlayColor='transparent'
        >
        <Image 
        source={require('image!up')}
        style={styles.button}
        resizeMode={Image.resizeMode.cover}
        /></TouchableHighlight><TouchableHighlight
        underlayColor='transparent'
        onPress={() => this._pressPop(alpha)}
        >
        <Image 
        source={require('image!down')}
        style={styles.button}
        resizeMode={Image.resizeMode.cover}
        /></TouchableHighlight></View>
        </View>
      </View>
    );
  },
      
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
      padding:3,
      borderWidth:1,
      borderColor:'#fff',
    
      
  },button:{
      margin:2,width:20, height:20, alignSelf:'center'},
  rightContainer: {
    flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      
      
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
      color:'#888',
      margin: 20,
    
  },titleVote: {
    fontSize: 15,
    textAlign: 'center',
      color:'#888',
      margin: 15,
    
  },header:{
  backgroundColor:'#333',
      height:70,
      justifyContent:'center',
      paddingTop:10,
      
  },headerTxt:{
      color:'#fff',
      fontWeight:"800",
      textAlign:'center',
      fontSize:16,
  },
  year: {
    textAlign: 'center',
      color:'#888',
  },votes: {
    flexDirection: 'row',
    justifyContent: 'center',
       margin: 5,
  },voting: {
    flexDirection: 'row',
    justifyContent: 'space-around',
      width:100,
       margin: 15,
  },voteHere:{
     backgroundColor:'#333',
      height:50,
      justifyContent:'center'
},
  listView: {
    height:260,
      margin:2,
  },
});

AppRegistry.registerComponent('rankAlpha', () => rankAlpha);