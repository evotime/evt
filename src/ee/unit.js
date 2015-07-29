ee.unitDie=function(u){
	u.canMove-=1;
	u.canAttack-=1;
	u.canUseSkill-=1;
	u.canUseItem-=1;

	u.canBeDebuff-=1;
	u.canBeAdDamaged-=1;
	u.canBeMoved-=1;
	u.canBeApDamaged-=1;
	//未完待续
}

ee.makeSpriteBody=function(animInfo){
	var body=new cc.Sprite();
	body.anims={};
	for(var l=0;l<animInfo.length;l++){
		var info=animInfo[l];
		var animName=info[0];
		var animLength=info[1];
		var animNext=info[2];
		body.anims[animName]=[];
		for(var i = 1;i<(animLength+1);i++){
			body.anims[animName].push(cc.spriteFrameCache.getSpriteFrame(animName+"_"+i+".png"));
		}
		body.anims[animName].push(animNext);
	}
	body.timeStep=1/24;

	body.playAnim=function(name){
		body.currentAnimName=name;
		body.currentAnimFrame=0;
		body.currentTime=0;
		body.time=0;
		body.setSpriteFrame((body.anims[body.currentAnimName])[body.currentAnimFrame]);
	}

	body.playAnim("stand");
	body.setTimeStep=function(n){
		body.timeStep=n;
	}
	body.nextFrame=function(){
		
		if((body.currentAnimFrame+2)==body.anims[body.currentAnimName].length){
			
			if((body.anims[body.currentAnimName][body.anims[body.currentAnimName].length])!="none")
				{
				body.currentAnimName=body.anims[body.currentAnimName][body.anims[body.currentAnimName].length-1];
				body.currentAnimFrame=0;
				body.setSpriteFrame(body.anims[body.currentAnimName][body.currentAnimFrame]);
				}
			else{
				
			}
		}
		else{body.currentAnimFrame+=1;
		body.setSpriteFrame(body.anims[body.currentAnimName][body.currentAnimFrame]);}

	}
	body.update=function(){
		body.time+=ee.timeStep;

		if(body.time>body.timeStep){
			body.nextFrame();
			body.time-=body.timeStep;
		}
	}
	return body;
}


ee.makeUnit=function(){
	var unit = {
		life:500,
		maxLife:500,
		lifeRegen:0,

		adDamage:50,
		adArmor:0,
		apDamage:0,
		apArmor:0,

		critRate:0,
		critRank:1,

		adLifeSuckValue:0,
		adLifeSuckPct:0,

		x:0,
		y:0,
		xspeed:200,
		yspeed:0,
		face:1,
		gravity:10,

		canMove:0,
		canAttack:0,
		canUseSkill:0,
		canUseItem:0,

		canBeDebuff:0,
		canBeAdDamaged:0,
		canBeMoved:0,
		canBeApDamaged:0,

		isInvisible:0,

		onDealDamage:{},
		onSufferDamage:{},
		onDeath:{},
		onDealAttack:{},
		onCastSkill:{},

		onUpdate:{},

		buffs:{},
		skills:{},

		body:null,
		takeDamage:function(damage){
				//1.checktype 2.calculate 3.deal effect 4.check death

				var num=damage.damageNum;
				if(damage.countAdArmor){
					num=num*(1/(1+0.06*this.adArmor));
				}				
				if(damage.countApArmor){
					num=num*(1/(1+0.06*this.apArmor));
				}
				if(num>this.life)num=this.life;
				for(effect in damage.caster.onDealDamage){
					effect(damage.caster,this,num);
				}
				for(effect in this.onSufferDamage){
					effect(this,damage.caster,num);
				}

				this.life-=num;
				if(this.life==0){
					for(effect in this.onDeath){
						effect(this,damage.caster);
					}
					ee.unitDie(this);
				}
		}
		
	};
	return unit;
}


