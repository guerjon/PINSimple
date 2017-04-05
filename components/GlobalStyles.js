module.exports = {
	row : {
		backgroundColor: "white",
		flexDirection: 'row',
		borderBottomWidth: 0.5,
		padding:10
	},
	row_selected:{
		backgroundColor : "#F5F5F5",
		flexDirection: "row",
		borderBottomWidth: 0.5,
		padding: 10
	},
	item_title_container:{
		padding:10
	},
	item_title: {
		color:"white"
	},
	item_name_container: {
		width: 100,
		alignItems: 'flex-end'
	},
	item_name : {
		color: "#00dddd",
	},
	item_input_container :{
		marginLeft:10
	},
	item_input : {

	},
	thumbnail_container :{
	    alignItems: "center",
	    justifyContent : "center",
	    flexDirection: "column",
	},
  	thumbnail: {
	    width: 120,
	    height: 120,
	    borderRadius: 20
  	},
  	thumbnail_mini :{
	    width: 25,
	    height: 25,
	    borderRadius: 20  		
  	},
  	titleContainer: {
  		height:50,
  		alignItems:"center",
  		justifyContent:"center"
  	},
  	title: {
  		fontSize:32,
  		fontWeight:"bold",
  		color: "black"
  	},
	cancelButton: {
		height: 36,
		width:150,
		backgroundColor: 'red',
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'  	
	},
	saveButton: {
		height: 36,
		backgroundColor: '#83c341',
		borderRadius: 8,
		position: "absolute",
		justifyContent: 'center',
		width:150,	
	},
	buttonText:{
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'		
	},
	little_piece_image_container:{
		borderWidth: 0.5,
		borderRadius: 5
	},
	little_piece_image :{
		width: 30,
		height: 30
	},
    searchbarContainer :{
        backgroundColor : "#eaebed",
        flexDirection: "row",
        height: 30,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 5,
        marginRight:10,
        marginLeft:10,
        marginBottom: 5
    },
    searchBar: {
        height: 40,
        fontSize: 15,
        width:320,
    },
    iconSearchContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
}