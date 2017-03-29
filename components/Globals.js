module.exports = {
  	STORE_KEY: 'a56z0fzrNpl^2',
  	BASE_URL: 'http://admin.pinsimple.com/api/',
 	PRIMARY_COLOR: "#29323C",
 	SECONDARY_COLOR : "#8F969E",
 	BORDER_BOTTOM_COLOR: "#F8F9F9",
 	GET_TREE : function(data,kind){
		var tree = [];

		for(var i = 0;i < data.length;i++){
			
			switch(kind){
				case 'buildings' :
					var subdata = data[i].buildings;
					for (var j = subdata.length - 1; j >= 0; j--) {
					 	subdata[j].campus_name = data[i].campus_name;
					}
					break;
				case 'rooms' :
					var subdata = data[i].rooms;
					for (var j = subdata.length - 1; j >= 0; j--) {
						subdata[j].campus_name = data[i].campus_name;
						subdata[j].building_name = data[i].building_name;
					}
					break;
				case 'devices':
					var subdata = data[i].devices;
					for (var j = subdata.length - 1; j >= 0; j--) {
						subdata[j].campus_name = data[i].campus_name;
						subdata[j].building_name = data[i].building_name;
						subdata[j].room_name = data[i].room_name;
					}
					
					break;
				default:
					var subdata = data;
					return;
			}
			
			if (subdata.length > 0) {
				for(var j = 0;j < subdata.length;j++){
					tree.push(subdata[j]);
				}
			}
		}
		return tree; 		
 	}
};

