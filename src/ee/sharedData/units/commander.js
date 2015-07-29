ee.makeCommander=function(){
	var u = ee.makeUnit();
	var animInfo=[["attack1",7,"stand"],
				  ["attack2",8,"stand"],
				  ["attack3",45,"stand"],
				  ["die",15,"none"],
				  ["onHit",8,"stand"],
				  ["run",6,"run"],
				  ["stand",12,"stand"],
				  ["walk",8,"walk"]];



	u.body=ee.makeSpriteBody(animInfo);

	return u;
}