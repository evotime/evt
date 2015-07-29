var ee={};

ee.fps=60;
ee.timeStep=1/ee.fps;


ee.DamageType={
	PHYSICAL:0,
	MAGICAL:1,
	REAL:2
}


ee.unitUpdate=function(u){
	for(updater in u.onUpdate){
		updater(u);
	}
}
