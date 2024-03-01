// Todo 
// Build Shield with objects in front of character

let game_character_element = document.getElementById("gameCharacter");
let game_ground_element = document.getElementById("gameGround");
let game_content_element = document.getElementById("gameContent");
// position gameCharacter on base
let base_ground = 529; // px from top
let base_character = base_ground - game_character_element.clientHeight;
let background_move_counter = 0;
game_character_element.style.top = base_character + 'px';
game_character_element.style.left = parseInt(screen.width/3 - game_character_element.clientWidth) + 'px';
game_ground_element.style.top = base_ground + 'px';

let game_character = [
  {
    name : "Mark",
    base : base_character,
    move_right : false,
    move_left : false,
    jump : false,
    start_jump_time : -1,
    position_x : parseInt(screen.width/3 - game_character_element.clientWidth),
    position_y : base_character,
    width : game_character_element.clientWidth,
    height : game_character_element.clientHeight,
    collision_left : false,
    collision_right : false,
    collision_top : false,
    collision_bottom : false,
    fall_down : false,
    shooting_index : 0,
    shooting : false,
    shooting_counter : 70,
    direction : "right",
    shield_deployed : false,
    sword_deployed : true,
    swording : false,
    swording_counter : 100,
    life : 4,
    arrows : 8,
    score : 0,
  },
];
let arrow_display = document.getElementById("arrowsDisplay");
arrow_display.innerHTML = game_character[0].arrows + 'x';
let score_display = document.getElementById("gameScore");
score_display.innerHTML = game_character[0].score;

let shield = [
  {
    width : 40,
    height : game_character[0].height,
    left : game_character[0].position_x + game_character[0].width,
    top : base_ground - game_character[0].height,
    life : 5,
  }
];
let shield_element = document.getElementById("shield");
shield_element.style.width = shield[0].width + 'px';
shield_element.style.height = shield[0].height + 'px';
shield_element.style.left = shield[0].left + 'px';
shield_element.style.top = shield[0].top + 'px';
shield_element.style.background = "url(\"assets/images/shield.png\")";
shield_element.style.backgroundSize = "cover";
let sword = [
  {
    width : 50,
    height : 100,
    left : game_character[0].position_x + game_character[0].width - 20,
    top : base_ground - game_character[0].height,
  }
];
let sword_element = document.getElementById("sword");
sword_element.style.width = sword[0].width + 'px';
sword_element.style.height = sword[0].height + 'px';
sword_element.style.left = sword[0].left + 'px';
sword_element.style.top = sword[0].top + 'px';
sword_element.style.background = "url(\"assets/images/sword.png\")";
sword_element.style.backgroundSize = "cover";

let fired_shots = [
  // top, left
];
let fired_shots_properties = [
  /*{
    left: ,
    top: ,
    width: ,
    height: ,
    distance: ,
    direction: ,
    color: "green",
  }*/
];
let shot_distance = []; // distance
let enemy_fired_shots = [];
let enemy_fired_shots_properties = [];
let enemy_shot_distance = [];

let animation_index = 0;
let animation_pictures = [];
animation_pictures[0] = "assets/images/CharacterMove0.png";
animation_pictures[1] = "assets/images/CharacterMove1.png";
animation_pictures[2] = "assets/images/CharacterMove2.png";
animation_pictures[3] = "assets/images/CharacterMove3.png";

let hearts_display = document.getElementById("heartsDisplay");
hearts_display.style.right = '-8px';
hearts_display.style.top = '65px';
hearts_display.style.background = "url(\"assets/images/hearts4.png\")";
hearts_display.style.position = 'absolute';
hearts_display.style.backgroundSize = 'cover';
hearts_display.style.width = '150px';
hearts_display.style.height = '80px';
let hearts_display_url = [];
hearts_display_url[0] = "url(\"assets/images/hearts0.png\")";
hearts_display_url[1] = "url(\"assets/images/hearts1.png\")";
hearts_display_url[2] = "url(\"assets/images/hearts2.png\")";
hearts_display_url[3] = "url(\"assets/images/hearts3.png\")";
hearts_display_url[4] = "url(\"assets/images/hearts4.png\")";

let booster_element = [];
let booster_properties = [
  {
    // width
    // height
    // top
    // left
    // type : "medicine" , "arrows"
    // background
    // backgroundSize
    // used : false
  }
]

let arrows_element = [];
let arrows_properties = [];

let gyarados_element = document.getElementById("gyarados");
let gyarados_properties = 
  [
    {
      left : 0,
      top : 0,
      width: 450,
      height: 200,
      active : false,
      hit : false,
    },
  ]

// create scene
let trees = document.getElementById("trees");
trees.style.height =  300 + 'px'
trees.style.top = base_ground - 300 + 'px';
let trees_counter = 0;
let scenery_objects_elements = [];
scenery_objects_elements[0] = document.getElementById("castleBase");
scenery_objects_elements[1] = document.getElementById("sakura1");
scenery_objects_elements[2] = document.getElementById("tori1");
scenery_objects_elements[3] = document.getElementById("sakura2");
scenery_objects_elements[4] = document.getElementById("sakura3");
scenery_objects_elements[5] = document.getElementById("cat1");
scenery_objects_elements[6] = document.getElementById("cat2");
scenery_objects_elements[7] = document.getElementById("cat3");
scenery_objects_elements[8] = document.getElementById("cat4");
scenery_objects_elements[9] = document.getElementById("familyMart1");
scenery_objects_elements[10] = document.getElementById("house1");
let scenery_objects_properties = [
  {
    name : "castleBase",
    width : scenery_objects_elements[0].clientWidth,
    height : scenery_objects_elements[0].clientHeight,
    left : 500,
    top : base_ground - scenery_objects_elements[0].clientHeight,
    url : "url(\"assets/images/castle.png\")",
    speed : 0.2,
    move_counter : 500,
    opacity : "opacity(90%)",
  },
  {
    name : "sakura1",
    width : scenery_objects_elements[1].clientWidth,
    height : scenery_objects_elements[1].clientHeight,
    left : 200,
    top : base_ground - scenery_objects_elements[1].clientHeight,
    url : "url(\"assets/images/sakura1.png\")",
    speed : 1,
    move_counter : 200,
    opacity : "opacity(90%)",
  },
  {
    name : "tori1",
    width : scenery_objects_elements[2].clientWidth,
    height : scenery_objects_elements[2].clientHeight,
    left : 1000,
    top : base_ground - scenery_objects_elements[2].clientHeight + 15,
    url : "url(\"assets/images/tori1.png\")",
    speed : 1,
    move_counter : 1000,
    opacity : "opacity(100%)",
  },
  {
    name : "sakura2",
    width : scenery_objects_elements[3].clientWidth,
    height : scenery_objects_elements[3].clientHeight,
    left : 800,
    top : base_ground - scenery_objects_elements[3].clientHeight,
    url : "url(\"assets/images/sakura1.png\")",
    speed : 1,
    move_counter : 800,
    opacity : "opacity(90%)",
  },
  {
    name : "sakura3",
    width : scenery_objects_elements[4].clientWidth,
    height : scenery_objects_elements[4].clientHeight,
    left : 1100,
    top : base_ground - scenery_objects_elements[4].clientHeight,
    url : "url(\"assets/images/sakura1.png\")",
    speed : 1,
    move_counter : 1100,
    opacity : "opacity(90%)",
  },
  {
    name : "cat1",
    width : scenery_objects_elements[5].clientWidth,
    height : scenery_objects_elements[5].clientHeight,
    left : 200,
    top : base_ground - scenery_objects_elements[5].clientHeight,
    url : "url(\"assets/images/cat1.png\")",
    speed : 2,
    move_counter : 200,
    opacity : "opacity(100%)",
  },
  {
    name : "cat2",
    width : scenery_objects_elements[6].clientWidth,
    height : scenery_objects_elements[6].clientHeight,
    left : 1200,
    top : base_ground - scenery_objects_elements[6].clientHeight,
    url : "url(\"assets/images/cat1.png\")",
    speed : 1,
    move_counter : 1200,
    opacity : "opacity(100%)",
  },
  {
    name : "cat3",
    width : scenery_objects_elements[7].clientWidth,
    height : scenery_objects_elements[7].clientHeight,
    left : 1300,
    top : base_ground - scenery_objects_elements[7].clientHeight,
    url : "url(\"assets/images/cat1.png\")",
    speed : 1,
    move_counter : 1300,
    opacity : "opacity(100%)",
  },
  {
    name : "cat4",
    width : scenery_objects_elements[8].clientWidth,
    height : scenery_objects_elements[8].clientHeight,
    left : 1350,
    top : base_ground - scenery_objects_elements[8].clientHeight,
    url : "url(\"assets/images/cat1.png\")",
    speed : 1,
    move_counter : 1350,
    opacity : "opacity(100%)",
  },
  {
    name : "familiyMart1",
    width : scenery_objects_elements[9].clientWidth,
    height : scenery_objects_elements[9].clientHeight,
    left : -40,
    top : base_ground - scenery_objects_elements[9].clientHeight + 20,
    url : "url(\"assets/images/familyMart.png\")",
    speed : 1,
    move_counter : -40,
    opacity : "opacity(100%)",
  },
  {
    name : "house1",
    width : scenery_objects_elements[10].clientWidth,
    height : scenery_objects_elements[10].clientHeight,
    left : 1600,
    top : base_ground - scenery_objects_elements[10].clientHeight + 5,
    url : "url(\"assets/images/house1.png\")",
    speed : 1,
    move_counter : 1600,
    opacity : "opacity(100%)",
  },
];
// random Object
let random_scene = [
  {
    name : "sakura_tree",
    width_min : 250, // 250 - 450
    width_max : 450,
    width_height_ratio : 3/4,
    url : "url(\"assets/images/sakura1.png\")",
    opacity : "opacity(90%)",
  },
  {
    name : "tori",
    width_min : 200, // 200 - 500
    width_max : 500,
    width_height_ratio : 23/30,
    url : "url(\"assets/images/tori1.png\")",
    opacity : "opacity(100%)",
  },
  {
    name : "house",
    width_min : 200, // 200 - 500
    width_max : 500,
    width_height_ratio : 23/30,
    url : "url(\"assets/images/house1.png\")",
    opacity : "opacity(100%)",
  },
  {
    name : "cat",
    width_min : 100, // 100 - 200
    width_max : 200,
    width_height_ratio : 1,
    url : "url(\"assets/images/cat1.png\")",
    opacity : "opacity(100%)",
  },
  {
    name : "family_mart",
    width_min : 400,
    width_max : 400,
    width_height_ratio : 10/7,
    url : "url(\"assets/images/familyMart.png\")",
    opacity : "opacity(100%)",
  },
  {
    name : "seven_eleven",
    width_min : 400,
    width_max : 400,
    width_height_ratio : 10/7,
    url : "url(\"assets/images/711.png\")",
    opacity : "opacity(100%)",
  },
];
for (var i = 0; i < scenery_objects_elements.length; i++) {
  scenery_objects_elements[i].style.width = scenery_objects_properties[i].width + 'px';
  scenery_objects_elements[i].style.height = scenery_objects_properties[i].height + 'px';
  scenery_objects_elements[i].style.left = scenery_objects_properties[i].left + 'px';
  scenery_objects_elements[i].style.top = scenery_objects_properties[i].top + 'px';
  scenery_objects_elements[i].style.background = scenery_objects_properties[i].url;
  scenery_objects_elements[i].style.backgroundSize = "cover";
  scenery_objects_elements[i].style.position = "absolute";
  scenery_objects_elements[i].style.filter = scenery_objects_properties[i].opacity;
}

let gameCounter = document.getElementById("gameCounter");
let gameCounterLimit = 31;
let gameCounterCount = gameCounterLimit;
gameCounter.innerHTML = gameCounterCount;

let obstacles_element = [];
obstacles_element[0] = document.getElementById("obstacleOne");
obstacles_element[1] = document.getElementById("obstacleTwo");
obstacles_element[2] = document.getElementById("obstacleThree");
// generate Obstacles
let obstacles = [
  {
    id : 0,
    width : obstacles_element[0].clientWidth,
    height : obstacles_element[0].clientHeight,
    left : 500,
    top : base_ground - obstacles_element[0].clientHeight - 200,
  },
  {
    id : 1,
    width : obstacles_element[1].clientWidth,
    height : obstacles_element[1].clientHeight,
    left : 800,
    top : base_ground - obstacles_element[1].clientHeight,
  },
  {
    id : 2,
    width : obstacles_element[2].clientWidth,
    height : obstacles_element[2].clientHeight,
    left : 1000,
    top : base_ground - obstacles_element[2].clientHeight,
  },
];
let bottom_obstacles = [];

let enemies_elements = [];
enemies_elements[0] = document.getElementById("enemy1");
let enemies_properties = [
  {
  id: 0,
  width: 120,
  height: 120,
  top: base_ground - 120,
  left: 0,
  left_border: 120,
  right_border: 320, 
  is_moving : true,
  direction : "right",
  image: "assets/images/Enemy.png",
  life: 5,
  distance: 220,
  shot_counter: -1,
  },
];
let last_enemy_created = 0;
// sets all Elements
for (var i = 0; i < obstacles.length; i++) {
  obstacles_element[i].style.left = obstacles[i].left + 'px';
  obstacles_element[i].style.top = obstacles[i].top + 'px';
}
for (var i = 0; i < enemies_elements.length; i++) {
  enemies_elements[i].style.background = "url(\"assets/images/Enemy.png\")";
  enemies_elements[i].style.backgroundSize = "cover";
  enemies_elements[i].style.height = enemies_properties[i].height + 'px';
  enemies_elements[i].style.width = enemies_properties[i].width + 'px';
  enemies_elements[i].style.left = enemies_properties[i].left + 'px';
  enemies_elements[i].style.top = enemies_properties[i].top + 'px';
}

let counter = 0;
let id = null;
let scene_generated = false;

// key listener
window.addEventListener('keydown', function (e) {
  if (e.key.toLocaleLowerCase() == 'w' || e.key == ' ' || e.key == "ArrowUp") { // jump
    game_character[0].jump = true;
  } else if (e.key.toLocaleLowerCase() == 'd' || e.key == "ArrowRight") {
    if (game_character[0].jump == false && game_character[0].move_right == true && game_character[0].move_left == false) { // already moving
      game_character[0].move_right = false;
    } else {
      game_character[0].move_right = true;
      game_character[0].move_left = false;
      game_character[0].direction = "right"; // Character looks right
      game_character_element.style.transform = "scaleX(1)";
      shield_element.style.transform = "scaleX(1)"; // Flip shield
      shield_element.style.left = shield[0].left + 'px';
      sword_element.style.transform = "scaleX(1)"; // Flip sword
      sword_element.style.left = sword[0].left + 'px';
    }
  } else if (e.key.toLocaleLowerCase() == 'a' || e.key == "ArrowLeft") {
    if (game_character[0].jump == false && game_character[0].move_right == false && game_character[0].move_left == true) {
      game_character[0].move_left = false;
    } else {
      game_character[0].move_right = false;
      game_character[0].move_left = true;
      game_character[0].direction = "left"; // Character looks left
      game_character_element.style.transform = "scaleX(-1)";
      shield_element.style.transform = "scaleX(-1)"; // Flip shield
      shield_element.style.left = game_character[0].position_x - shield[0].width + 'px';
      sword_element.style.transform = "scaleX(-1)"; // Flip sword
      sword_element.style.left = game_character[0].position_x - sword[0].width + 20 + 'px';
    } 
  } else if (e.key.toLocaleLowerCase() == 'f') {
    if (game_character[0].shield_deployed == false && game_character[0].arrows > 0) {
      game_character[0].shooting = true;
    }
  } else if (e.key.toLocaleLowerCase() == 'e') {
    //deploy shield
    if (game_character[0].shield_deployed == true) {
      game_character[0].shield_deployed = false; // put down the shield
      shield_element.style.display = "none";
      game_character[0].sword_deployed = true;
      sword_element.style.display = "block";
    } else {
      game_character[0].shield_deployed = true; // equip shield
      shield_element.style.display = "block";
      game_character[0].sword_deployed = false;
      sword_element.style.display = "none";
    }
  } else if (e.key.toLowerCase() == 'c') {
    // use sword
    if (game_character[0].sword_deployed == true) {
      game_character[0].swording = true;
    }
  }
}, false);

// starts animation
function run() {
  clearInterval(id);
  id = setInterval(frame, 16);
  if (scene_generated == false) {
    generateScene(30);
    generateEntities(60);
    spawnEnemies();
    scene_generated = true;
  }
}

// gameloop
function frame() {
  counter++; // timer for game
  // update gameCounter
  gameCounterCount -= 1/60
  gameCounter.innerHTML = parseInt(gameCounterCount);

  // gameover
  if (parseInt(gameCounterCount) <= 0) {
    gameOver();
  }

  // Random event
  if (counter % 3000 == parseInt(Math.random() * (800 - 200) + 200) && gyarados_properties[0].active == false) {
    startGyarados();
  }
  if (gyarados_properties[0].active == true) {
    moveGyarados();
  }

  // generate scene procedurely
  if (obstacles[obstacles.length - 1].left - game_character[0].position_x <= 2000 && scene_generated == true) {
    generateScene(30);
    spawnEnemies();
    generateEntities(60);
  }

  // move shots
  if (fired_shots.length > 0) { // A shot is active
    moveShots();
  }
  if (enemy_fired_shots.length > 0) {
    moveEnemyShots();
  }

  // move scene and check hitbox
  if (game_character[0].move_right == true || game_character[0].move_left == true) {
    // check hitbox
    checkHitbox();
    // move scene
    moveScene();
    // change animation
    changeAnimation();
  }
  // check jump
  if (game_character[0].jump == true) {
    if (game_character[0].start_jump_time == -1) {
      game_character[0].start_jump_time = counter;
      let jumpAudio = new Audio("assets/sounds/jump.wav")
      jumpAudio.volume = 0.1;
      jumpAudio.play()
    }
    jumpCharacter(counter - game_character[0].start_jump_time);
  }

  // Check if character is above, when he will fall down
  if (game_character[0].base != base_character && game_character[0].jump == false) {
    fallDown();    
  }

  // sword slashing
  game_character[0].swording_counter++;
  if (game_character[0].swording == true) {
    if (game_character[0].swording_counter > 100) {
      var swordingAudio = new Audio("assets/sounds/swording.wav").play();
      swing_sword();
    } else {
      game_character[0].swording = false;
    }
  }

  // shooting
  game_character[0].shooting_counter++;
  if (game_character[0].shooting == true) { // a shot is fired
    if (game_character[0].shooting_counter > 30) {
      var bowAudio = new Audio("assets/sounds/bow.wav").play();
      shoot_bullet();
      decreaseArrows();
    } else {
      game_character[0].shooting = false
    }   
  }

  // deploy shield
  shield_element.style.top = game_character[0].position_y +'px';
  sword_element.style.top = game_character[0].position_y +'px';
 
  // enemies shoot against character 
  enemiesAttackCharacter();

  // move all enemies
  moveEnemies();

  // sword animation
  if (game_character[0].swording_counter == 5) {
    if (game_character[0].direction == "left") {
      sword_element.style.transform = "rotate(-60deg)"
    } else {
      sword_element.style.transform = "rotate(60deg)";
    }
  }
  if (game_character[0].swording_counter == 30) {
    if (game_character[0].direction == "left") {
      sword_element.style.transform = "rotate(0deg)"
      sword_element.style.transform = "scaleX(-1)"
    } else {
      sword_element.style.transform = "rotate(0deg)";
    }
  }
  
}
function gameOver() {
  let gameOverAudio = new Audio("assets/sounds/gameOver.wav").play();
  clearInterval(id);
}

function startGyarados() {
  gyarados_properties[0].active = true;
  gyarados_properties[0].hit = false;
  gyarados_element.style.left = parseInt(game_character[0].position_x + 500) + 'px';
  gyarados_element.style.top = base_ground - (2 * 200); // 200 height
  gyarados_properties[0].left = parseInt(game_character[0].position_x + 2000);
  gyarados_properties[0].top = base_ground - (2 * 200);
  let gyaradosAudio = new Audio("assets/sounds/dragon.mp3").play();
  gyarados_element.style.display = "block";
}
function moveGyarados() {
  --gyarados_properties[0].counter;
  if (gyarados_properties[0].left <= game_character[0].position_x - 2000) {
    gyarados_properties[0].active = false;
    gyarados_properties[0].hit = false;
    gyarados_element.style.display = "none";
  } else {
    if (gyarados_properties[0].hit == false && shotHitboxScan(game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height,
      gyarados_properties[0].left, gyarados_properties[0].top+200, gyarados_properties[0].width,
      gyarados_properties[0].height)) {
        characterHit(2);
        gyarados_properties[0].hit = true;
        let gyaradosHitAudio = new Audio("assets/sounds/dragonBite.mp3").play();
    }
    // calculate next position
    let next_pos = 0;
    // character movement 
    next_pos += characterMovement();
    // enemy movement
    next_pos -= 5;
    // change position accordingly
    gyarados_element.style.left = (gyarados_properties[0].left += next_pos) + 'px';
  }
}

function decreaseArrows () {
  game_character[0].arrows--;
  arrow_display.innerHTML = "" + game_character[0].arrows + "x";
}

function refillArrows () {
  game_character[0].arrows += 8;
  arrow_display.innerHTML = "" + game_character[0].arrows + "x"
}

function healCharacter () {
  game_character[0].life = 4;
  hearts_display.style.background = "url(\"assets/images/hearts4.png\")";
  hearts_display.style.backgroundSize = 'cover';
}

function createBooster (index, boosterType) {
  let booster_property = {
    width : 80,
    height : 80,
    top : base_ground - 120,
    left : scenery_objects_properties[index].left + 200,
    type : boosterType,
    background : "url(\"assets/images/medicine.png\")",
    used : false,
  }
  if (boosterType == "arrows") {
    booster_property.background = "url(\"assets/images/arrows.png\")"
  }
  booster_properties.push(booster_property);

  booster_element[booster_element.length] = document.createElement("div");
  booster_element[booster_element.length - 1].style.width = booster_property.width + 'px';
  booster_element[booster_element.length - 1].style.height = booster_property.height + 'px';
  booster_element[booster_element.length - 1].style.top = booster_property.top + 'px';
  booster_element[booster_element.length - 1].style.left = booster_property.left + 'px';
  booster_element[booster_element.length - 1].style.background = booster_property.background;
  booster_element[booster_element.length - 1].style.backgroundSize = 'cover';
  booster_element[booster_element.length - 1].style.position = 'absolute';

  document.body.appendChild(booster_element[booster_element.length - 1]);
  
}

function enemiesAttackCharacter () {
  for (let i = 0; i < enemies_properties.length; i++) {
    if (enemies_properties[i].life <= 0 || enemies_properties[i] == null) {
      continue;
    }
    // Distance is too big to be noticed
    let distance_c_to_e = enemies_properties[i].left - game_character[0].position_x;
    if (Math.abs(distance_c_to_e) >= 1000) {
      continue;
    }
    if ((distance_c_to_e > 0 && enemies_properties[i].direction == "left") ||
    (distance_c_to_e < 0 && enemies_properties[i].direction == "right")) {
      // enemy sees character
      attackCharacter(i);
    }
  }
}

function attackCharacter (index) {
  // index of enemy
  if (++enemies_properties[index].shot_counter > 70) {
  
    // enemy is ready to shoot
    let enemy_fired_shot_property = {
      left : parseInt(enemies_properties[index].left + enemies_properties[index].width + 10),
      top : parseInt(enemies_properties[index].top + 40),
      width : 30,
      height : 30,
      background : "url(\"assets/images/shuriken.png\")",
      distance : 0,
      direction : enemies_properties[index].direction,
    }
    // shot to the left
    if (enemy_fired_shot_property.direction == "left") {
      enemy_fired_shot_property.left = parseInt(enemies_properties[index].left - 10);
    }
  
    enemy_fired_shots_properties.push(enemy_fired_shot_property);
    enemy_fired_shots[enemy_fired_shots.length] = document.createElement("div");
    let index_shot = enemy_fired_shots.length - 1;
    // design shot
    enemy_fired_shots[index_shot].style.left = enemy_fired_shot_property.left + 'px'; // index - 1
    enemy_fired_shots[index_shot].style.top = enemy_fired_shot_property.top + 'px';
    enemy_fired_shots[index_shot].style.position = 'absolute';
    enemy_fired_shots[index_shot].style.width = enemy_fired_shot_property.width + 'px';
    enemy_fired_shots[index_shot].style.height = enemy_fired_shot_property.height + 'px';
    enemy_fired_shots[index_shot].style.background = enemy_fired_shot_property.background;
    enemy_fired_shots[index_shot].style.backgroundSize = "cover";

    document.body.appendChild(enemy_fired_shots[index_shot]);
    enemies_properties[index].shot_counter = 0;
    let throwAudio = new Audio("assets/sounds/throw.wav").play();
  }
}

function moveEnemyShots () {
  for (var i = 0; i < enemy_fired_shots.length; i++) {
    if (enemy_fired_shots_properties[i] == null || enemy_fired_shots[i].style.display == "none") {
      continue;
    }
    let enemy_shot_hit = checkEnemyHitboxShots(i); 

    if (enemy_shot_hit == true || enemy_fired_shots_properties[i].distance >= 1000) {
      enemy_fired_shots_properties[i] = null;
      enemy_fired_shots[i].style.display = "none";
      continue;

    } else {
      //alert("shot No" + i + " left: " + enemy_fired_shots_properties[i].left);
      enemy_fired_shots_properties[i].distance += 11;
      if (enemy_fired_shots_properties[i].direction == "left") {
        enemy_fired_shots_properties[i].left -= 11;
      } else {
        enemy_fired_shots_properties[i].left += 11;
      }
      enemy_fired_shots[i].style.left = enemy_fired_shots_properties[i].left + 'px';
    }
  }
}
function checkEnemyHitboxShots (index) {
  // shots
  // check for enemy hit
  if (shotHitboxScan(enemy_fired_shots_properties[index].left, enemy_fired_shots_properties[index].top,
    enemy_fired_shots_properties[index].width, enemy_fired_shots_properties[index].height,
    game_character[0].position_x, game_character[0].position_y, game_character[0].width, game_character[0].height) == true) {
      if (game_character[0].shield_deployed == false || (game_character[0].shield_deployed == true && game_character[0].direction == enemy_fired_shots_properties[index].direction)) {
        characterHit(1);
        return true;
      } else {
        let shieldAudio = new Audio("assets/sounds/defense.wav").play();
        return true;
      }
      
    }
  
  // check for object hit
  for (var i = 0; i < obstacles_element.length; i++) {
    let obstacle_hit = shotHitboxScan(enemy_fired_shots_properties[index].left, enemy_fired_shots_properties[index].top,
      enemy_fired_shots_properties[index].width, enemy_fired_shots_properties[index].height,
      obstacles[i].left, obstacles[i].top, obstacles[i].width, 
      obstacles[i].height);
    if (obstacle_hit) {
      // process enemy hit
      //hitObstacle(i)
      return true; // enemy is hit
    }
  }
  return false;
}
function characterHit (damage) {
  game_character[0].life -= damage;
  if (game_character[0].life <= 0) {
    // Character is dead
    hearts_display.style.background = "url(\"assets/images/hearts0.png\")";
    gameOver();
  } else {
    // Character is hit
    let characterHitAudio = new Audio("assets/sounds/oof.mp3").play();
    hearts_display.style.background = "url(\"assets/images/hearts" + game_character[0].life + ".png\")";
  }
  hearts_display.style.backgroundSize = 'cover';
}

function swing_sword () {
  game_character[0].swording = false;
  game_character[0].swording_counter = 0;
  for (var i = 0; i < enemies_elements.length; i++) {
    if (enemies_properties[i].life <= 0 || enemies_properties[i] == null) {
      continue;
    }
    if (shotHitboxScan (game_character[0].position_x - 100, game_character[0].position_y, 
      game_character[0].width + 200, game_character[0].height, enemies_properties[i].left, enemies_properties[i].top, enemies_properties[i].width, 
      enemies_properties[i].height) == true) {
        hitEnemy(i, 2);
    }
  }
}

function changeAnimation () {
  animation_index += 0.1;
    game_character_element.style.background = "url(" + animation_pictures[parseInt(animation_index) % animation_pictures.length] + ")";
    game_character_element.style.backgroundSize = "cover";
    if (parseInt(animation_index) == 0) {
      game_character_element.style.backgroundPositionX = "50px";
    } else if (parseInt(animation_index) == 1) {
      game_character_element.style.backgroundPositionX = "-12px";
    } else if (parseInt(animation_index) == 2) {
      game_character_element.style.backgroundPositionX = "0px";
    } else {
      game_character_element.style.backgroundPositionX = "-15px";
    }
}
function generateScene (amount_objects) {
  for (let i = 0; i < amount_objects; i++) {
    generateObject();
  }
  // generate Arrowspots
  generateArrows(amount_objects);
}
function generateArrows (amount) {
  let max_arrows_amount = Math.round(amount / 10) + 3;
  let min_arrows_amount = Math.round(amount / 10);
  let random_arrows_amount = Math.random() * (max_arrows_amount - min_arrows_amount) + max_arrows_amount;
  // spawn Arrows
  for (var i = 1; i <= random_arrows_amount; i++) {
    let pos = Math.round(i * (1 / (random_arrows_amount + 1)) * amount);
    generateArrow(pos, amount);
  }
}
function generateArrow (pos, amount) {
  let arrow_property = {
    width : 100,
    height : 80,
    top : obstacles[obstacles.length - amount + pos].top - 100,
    left : obstacles[obstacles.length - amount + pos].left + 200,
    type : "arrows",
    background : "url(\"assets/images/arrows.png\")",
    used : false,
  }
  arrows_properties.push(arrow_property);

  arrows_element[arrows_element.length] = document.createElement("div");
  arrows_element[arrows_element.length - 1].style.width = arrow_property.width + 'px';
  arrows_element[arrows_element.length - 1].style.height = arrow_property.height + 'px';
  arrows_element[arrows_element.length - 1].style.top = arrow_property.top + 'px';
  arrows_element[arrows_element.length - 1].style.left = arrow_property.left + 'px';
  arrows_element[arrows_element.length - 1].style.background = arrow_property.background;
  arrows_element[arrows_element.length - 1].style.backgroundSize = 'cover';
  arrows_element[arrows_element.length - 1].style.position = 'absolute';

  document.body.appendChild(arrows_element[arrows_element.length - 1]);
}

// creates 1 obstacle
function generateObject () {
  // generates 1 object
    let obstacle = {
      id : obstacles.length,
      width : Math.random() * (400 - 50) + 50, // random zwischen 50 und 400
      height : Math.random() * (100 - 50) + 50, // random zwischen 50 und 100
      left : obstacles[obstacles.length-1].left + 400,
      top : 0,
    }
    let min_left = obstacles[obstacles.length-1].left + obstacles[obstacles.length-1].width + game_character[0].width;
    let max_left = min_left + obstacle.width + 3 * game_character[0].width;
    obstacle.left = Math.random() * (max_left - min_left) + min_left;
    // Obstacle on ground
    let random = Math.round(Math.random());
    //random = 1;
    if (random == 0) {
      obstacle.top = base_ground - obstacle.height
    } else {
      // max 100 über letztem Object
      let min_top = base_ground - game_character[0].height - obstacle.height // min base - height
      let max_top = min_top - 100;
      //obstacle.top = Math.random() * (max_top - min_top) + min_top;
      obstacle.top = min_top;
      obstacle.left = min_left + 20;
    }


    obstacles_element[obstacles.length] = document.createElement("div");
    obstacles_element[obstacles.length].style.position = 'absolute';
    obstacles_element[obstacles.length].style.width = obstacle.width + 'px';
    obstacles_element[obstacles.length].style.height = obstacle.height + 'px';
    obstacles_element[obstacles.length].style.top = obstacle.top + 'px';
    obstacles_element[obstacles.length].style.left = obstacle.left + 'px';
    obstacles_element[obstacles.length].style.background = 'white';
    if (random % 2 == 0) {
      obstacles_element[obstacles.length].style.background = "url(assets/images/stone.jpg)";
      bottom_obstacles[bottom_obstacles.length] = obstacles.length;
    } else {
      obstacles_element[obstacles.length].style.background = "url(assets/images/hover.jpg)";
    }
    obstacles_element[obstacles.length].style.backgroundSize = 'cover';

    obstacles.push(obstacle);
    document.getElementById("generatedObstacles").appendChild(obstacles_element[obstacles.length-1]);
    
}
function generateEntities (amount_entities) {
  for (var i = 0; i < amount_entities; i++) {
    generateSceneryEntity();
  }
} 
function generateSceneryEntity () {
  
  let min_left = scenery_objects_properties[scenery_objects_properties.length-1].left + (scenery_objects_properties[scenery_objects_properties.length-1].width*0.75);
  let max_left = min_left + 20;
  // choose random Object
  //let random_index = Math.round(Math.random() * (random_scene.length - 1));
  // 0 sakura 1 tori 2 house 3 cat 4 familiy 5 711
  // 0 3 -> 1 -> 2 -> 4 5
  random_index = Math.random() * (100);
  if (random_index <= 35) {
    random_index = 0;
  } else if (random_index <= 45) {
    random_index = 1;
  } else if (random_index <= 60) {
    random_index = 2;
  } else if (random_index <= 95) {
    random_index = 3;
  } else if (random_index <= 97) {
    random_index = 4;
  } else {
    random_index = 5;
  }
  let random_width = parseInt(Math.random() * (random_scene[random_index].width_max - random_scene[random_index].width_min) + random_scene[random_index].width_min);
  let random_height = parseInt(random_width * random_scene[random_index].width_height_ratio);
  let random_left = Math.round(Math.random() * (max_left - min_left) + min_left);

  let random_object = {
      name : random_scene[random_index].name,
      width : random_width,
      height : random_height,
      left : random_left,
      top : base_ground - random_height,
      url : random_scene[random_index].url,
      speed : 1,
      move_counter : random_left,
      opacity : random_scene[random_index].opacity, 
  }

  scenery_objects_properties.push(random_object);
  scenery_objects_elements[scenery_objects_elements.length] = document.createElement("div");
  scenery_objects_elements[scenery_objects_elements.length-1].style.width = random_object.width + 'px';
  scenery_objects_elements[scenery_objects_elements.length-1].style.height = random_object.height + 'px';
  scenery_objects_elements[scenery_objects_elements.length-1].style.top = random_object.top + 'px';
  scenery_objects_elements[scenery_objects_elements.length-1].style.left = random_object.left + 'px';
  scenery_objects_elements[scenery_objects_elements.length-1].style.background = random_object.url;
  scenery_objects_elements[scenery_objects_elements.length-1].style.opacity = random_object.opacity;
  scenery_objects_elements[scenery_objects_elements.length-1].style.backgroundSize = "cover";
  scenery_objects_elements[scenery_objects_elements.length-1].style.position = "absolute";
  if (random_index == 4 || random_index == 5) {
    scenery_objects_elements[scenery_objects_elements.length-1].style.top = random_object.top + 20 + 'px';
  }
  if (random_index == 2) {
    scenery_objects_elements[scenery_objects_elements.length-1].style.top = random_object.top + 5 +'px';
  }
  document.getElementById("generatedObjects").appendChild(scenery_objects_elements[scenery_objects_elements.length - 1]);

  // spawn medikit
  if (random_index == 4 || random_index == 5) {
    createBooster(scenery_objects_elements.length-1, "medicine");
  }
}

function moveShots () {
  for (var i = 0; i < fired_shots.length; i++) {
    if (fired_shots_properties[i] == null || fired_shots[i].style.display == "none") {
      continue;
    }
    let shot_hit = checkHitboxShots(i); 
  
    if (shot_hit == true || fired_shots_properties[i].distance >= 1000) {
      fired_shots_properties[i] = null;
      fired_shots[i].style.display = "none";
      continue;

    } else {
      fired_shots_properties[i].distance += 11;
      if (fired_shots_properties[i].direction == "left") {
        fired_shots_properties[i].left -= 11;
      } else {
        fired_shots_properties[i].left += 11;
      }
      fired_shots[i].style.left = fired_shots_properties[i].left + 'px';
    }
  }
}
function checkHitboxShots (index) {
  // shots
  // check for enemy hit
  for (var i = 0; i < enemies_properties.length; i++) {
    if (enemies_properties[i].life <= 0 || enemies_properties[i] == null) {
      continue;
    }
    let enemy_hit = shotHitboxScan(fired_shots_properties[index].left, fired_shots_properties[index].top,
      fired_shots_properties[index].width, fired_shots_properties[index].height,
      enemies_properties[i].left, enemies_properties[i].top, enemies_properties[i].width, 
      enemies_properties[i].height);
    if (enemy_hit) {
      // process enemy hit
      hitEnemy(i, 1)
      return true; // enemy is hit
    }
  }
  // check for object hit
  for (var i = 0; i < obstacles_element.length; i++) {
    let obstacle_hit = shotHitboxScan(fired_shots_properties[index].left, fired_shots_properties[index].top,
      fired_shots_properties[index].width, fired_shots_properties[index].height,
      obstacles[i].left, obstacles[i].top, obstacles[i].width, 
      obstacles[i].height);
    if (obstacle_hit) {
      // process enemy hit
      //hitObstacle(i)
      return true; // enemy is hit
    }
  }
  return false;
}
// enemy is hit by shot
function hitEnemy (index, damage) {
  enemies_properties[index].life -= damage;
  if (enemies_properties[index].life <= 0) { // Enemy is dead
    var killAudio = new Audio("assets/sounds/kill.wav").play();
    enemies_elements[index].style.display = "none";
    game_character[0].score++;
    score_display.innerHTML = game_character[0].score;
    //enemies_properties[index] = null;
    gameCounterCount = gameCounterLimit
  } else {
    var hitAudio = new Audio("assets/sounds/hit.wav").play();
  }
}
function spawnEnemies () {

  for (let i = last_enemy_created; i < bottom_obstacles.length - 1; i++) {
    if (obstacles[bottom_obstacles[i+1]].left - obstacles[bottom_obstacles[i]].left + obstacles[bottom_obstacles[i]].width >= 700) {
      spawnEnemy(obstacles[bottom_obstacles[i]].left + obstacles[bottom_obstacles[i]].width + 20, obstacles[bottom_obstacles[i+1]].left - enemies_properties[0].width - 20) 
    }
  }
  last_enemy_created = bottom_obstacles.length - 1;

}
function spawnEnemy (leftBorder, rightBorder) {
  enemies_elements[enemies_elements.length] = document.createElement("div");
  let enemy = {
    id : enemies_properties.length,
    width : enemies_properties[0].width,
    height : enemies_properties[0].height,
    top : enemies_properties[0].top,
    left : leftBorder + 10,
    left_border : leftBorder,
    right_border : rightBorder,
    is_moving : true,
    direction : "right",
    image : "assets/images/Enemy.png",
    life : 5,
    distance : leftBorder + 10,
    shot_counter : -1,
  }
  enemies_properties.push(enemy);
  enemies_elements[enemies_elements.length - 1].style.left = enemy.left + 'px';
  enemies_elements[enemies_elements.length - 1].style.top = enemy.top + 'px';
  enemies_elements[enemies_elements.length - 1].style.width = enemy.width + 'px';
  enemies_elements[enemies_elements.length - 1].style.height = enemy.height + 'px';
  enemies_elements[enemies_elements.length - 1].style.background = "url(\"assets/images/Enemy.png\")";
  enemies_elements[enemies_elements.length - 1].style.position = "absolute";
  enemies_elements[enemies_elements.length - 1].style.backgroundSize = "cover";
  document.body.appendChild(enemies_elements[enemies_elements.length - 1]);
}

function shotHitboxScan (x1, y1, w1, h1, x2, y2, w2, h2) {
  if (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    h1 + y1 > y2
  ) { // collision detected
    if (y1 + h1 <= y2 + 12) { // character is on top of object
      // enemy hit bottom
    } else if(y1 >= y2 + h2 - 12 ) { // character hits bottom of object
      // enemy hit top
    } else if (x1 + w1 > x2 && x1 + w1 < x2 + w2) {
      // enemy hit right
    } else if (x1 <= x2 + w2) {
      // enemy hit left
    } else { // collision anywhere else
      // character hits bottom of object
      
    }
    return true;
  }
}
// creates shot
function shoot_bullet () {
  game_character[0].shooting_counter = 0;
  game_character[0].shooting = false;
    // create fire
    let index = game_character[0].shooting_index;

    let fired_shot_property = {
      left : parseInt(game_character[0].position_x + game_character[0].width + 10),
      top : parseInt(game_character[0].position_y + 40),
      width : 20,
      height : 5,
      color : "url(\"assets/images/arrow.png\")",
      distance : 0,
      direction : game_character[0].direction,
    }
    // shot to the left
    if (fired_shot_property.direction == "left") {
      fired_shot_property.left = parseInt(game_character[0].position_x - 10);
    }

    fired_shots_properties.push(fired_shot_property);
    fired_shots[index] = document.createElement("div");
    // design shot
    fired_shots[index].style.left = fired_shot_property.left + 'px'; // index - 1
    fired_shots[index].style.top = fired_shot_property.top + 'px';
    fired_shots[index].style.position = 'absolute';
    fired_shots[index].style.width = fired_shot_property.width + 'px';
    fired_shots[index].style.height = fired_shot_property.height + 'px';
    fired_shots[index].style.background = fired_shot_property.color;
    fired_shots[index].style.backgroundSize = "cover";

    document.body.appendChild(fired_shots[index]);
  
    game_character[0].shooting_index++;
}

function fallDown () {
  while (game_character[0].position_y <= base_character) {
    if (fallCheckHitbox() == false) { // if returns false -> no ground left
      game_character[0].position_y++;
    } else {
      break;
    }
  }
  // added--
  game_character[0].base = --game_character[0].position_y;
  game_character_element.style.top = game_character[0].base + 'px';
  //game_character[0].jump = false;
  if (game_character[0].position_y > base_ground - game_character[0].height - 10) {
    game_character[0].base = base_ground - game_character[0].height;
    game_character_element.style.top = game_character[0].base + 'px';
  } 
}
function fallCheckHitbox() {
  let object_hit = false;
  for (var i = 0; i < obstacles.length; i++) {
    
    object_hit = fallHitboxObject(game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height,
      obstacles[i].left, obstacles[i].top,
      obstacles[i].width, obstacles[i].height, game_character[0].base);
    if (object_hit == true) {
      return true;
    }
  }
  for (var i = 0; i < enemies_properties.length && enemies_properties[i].life > 0; i++) {
    
    object_hit = fallHitboxObject(game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height,
      enemies_elements[i].left, enemies_elements[i].top,
      enemies_elements[i].width, enemies_elements[i].height, game_character[0].base);
    if (object_hit == true) {
      return true;
    }
  }
  return object_hit;
}
function fallHitboxObject(x1, y1, w1, h1, x2, y2, w2, h2, base) {
  if (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    h1 + y1 > y2
  ) { // collision detected
    if (y1 + h1 <= y2 + 10) { // character is on top of object
      // character on top of object
      if (base != y2 - h1) { // if object is not already base -> make it
        //game_character[0].collision_bottom = true;
      }
      return true;
      //game_character[0].collision_bottom = false;
    }
    return true;    
  } else {
    return false;
  }
}


// check hitbox
function checkHitbox() {
  // for obstacles
  for (var i = 0; i < obstacles.length; i++) {
    
    hitboxObject(game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height,
      obstacles[i].left, obstacles[i].top,
      obstacles[i].width, obstacles[i].height, game_character[0].base);

  }
  for (var i = 0; i < enemies_properties.length; i++) { // HIER!!!!!
    if (enemies_properties[i].life <= 0) {
      continue;
    }
    hitboxObject(game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height,
      enemies_properties[i].left, enemies_properties[i].top,
      enemies_properties[i].width, enemies_properties[i].height, game_character[0].base);

  }

  for (var i = 0; i < booster_element.length; i++) {
    if (booster_properties[i].used == true) {
      continue;
    }
    if (shotHitboxScan (game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height, booster_properties[i].left, 
      booster_properties[i].top, booster_properties[i].width, booster_properties[i].height) == true) {
      booster_properties[i].used = true;
      booster_element[i].style.display = "none";
        healCharacter();
      }

  }

  for (var i = 0; i < arrows_element.length; i++) {
    if (arrows_properties[i].used == true) {
      continue;
    }
    if (shotHitboxScan (game_character[0].position_x, game_character[0].position_y, 
      game_character[0].width, game_character[0].height, arrows_properties[i].left, 
      arrows_properties[i].top, arrows_properties[i].width, arrows_properties[i].height) == true) {
        arrows_properties[i].used = true;
        arrows_element[i].style.display = "none";
        refillArrows();
      }

  }
  
}

// check hitbox for specific object
function hitboxObject(x1, y1, w1, h1, x2, y2, w2, h2, base) {
  if (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    h1 + y1 > y2
  ) { // collision detected
    if (y1 + h1 <= y2 + 12) { // character is on top of object
      // character on top of object
      if (game_character[0].base != y2 - h1) { // if object is not already base -> make it
        game_character[0].collision_bottom = true;
        colissionBottom(y2, base);
      }
      //game_character[0].collision_bottom = false;
    } else if(y1 >= y2 + h2 - 12 ) { // character hits bottom of object
      colissionTop();
    } else if (x1 + w1 > x2 && x1 + w1 < x2 + w2) {
      //game_character[0].collision_bottom = false;
      colissionRight(x2);  // character touches object on the right
    } else if (x1 <= x2 + w2) {
      colissionLeft(x2, w2);  // character touches object on the left
    } else { // collision anywhere else
      // character hits bottom of object
      
    }
  }
}

function colissionBottom (yPos, base) {
  if (game_character[0].base != yPos - game_character[0].height) {
    game_character[0].jump = false;
    game_character[0].start_jump_time = -1;
  }
  
  game_character[0].position_y = yPos - game_character[0].height;
  game_character[0].base = yPos - game_character[0].height;
  // clips character to top face
  game_character_element.style.top = game_character[0].base + 'px';
}
function colissionTop () {
  game_character[0].jump = false;
  game_character[0].position_y = game_character[0].base;
  game_character_element.style.top = game_character[0].base + 'px';
  game_character[0].start_jump_time = -1;
  // clips character to left face
} 
function colissionRight (x2) {
  game_character[0].move_right = false;
  game_character[0].move_left = false;
  game_character[0].jump = false;
  game_character[0].position_y = game_character[0].base;
  game_character_element.style.top = game_character[0].base + 'px';
  game_character[0].start_jump_time = -1;
  // clips character to left face
  for (var i = 0; i < obstacles.length; i++) {
    obstacles_element[i].style.left = (obstacles[i].left += 10) + 'px';
  }
  for (var i = 0; i < enemies_properties.length; i++) {
    enemies_elements[i].style.left = (enemies_properties[i].left += 10) + 'px';
    enemies_properties[i].left_border += 10;
    enemies_properties[i].right_border += 10;
  }
  for (var i = 0; i < booster_element.length; i++) {
    booster_element[i].style.left = (booster_properties[i].left += 10) + 'px';
  }
  for (var i = 0; i < arrows_properties.length; i++) {
    arrows_element[i].style.left = (arrows_properties[i].left += 10) + 'px';
  }
}
function colissionLeft (x2, w2) {
  game_character[0].move_right = false;
  game_character[0].move_left = false;
  game_character[0].jump = false;
  game_character[0].position_y = game_character[0].base;
  game_character_element.style.top = game_character[0].base + 'px';
  game_character[0].start_jump_time = -1;
  // clips character to left face
  for (var i = 0; i < obstacles.length; i++) {
    obstacles_element[i].style.left = (obstacles[i].left -= 10) + 'px';
  }
  for (var i = 0; i < enemies_properties.length; i++) {
    enemies_elements[i].style.left = (enemies_properties[i].left -= 10) + 'px';
    enemies_properties[i].left_border -= 10;
    enemies_properties[i].right_border -= 10;
  }
  for (var i = 0; i < booster_element.length; i++) {
    booster_element[i].style.left = (booster_properties[i].left -= 10) + 'px';
  }
  for (var i = 0; i < arrows_properties.length; i++) {
    arrows_element[i].style.left = (arrows_properties[i].left -= 10) + 'px';
  }
}

// character moves right
function moveScene() {
  // moves character to left/right
  if (game_character[0].move_right == true) {
    for (var i = 0; i < obstacles.length; i++) {
      obstacles_element[i].style.left = (obstacles[i].left -= 5) + 'px';
    }
    for (var i = 0; i < arrows_properties.length; i++) {
      arrows_element[i].style.left = (arrows_properties[i].left -= 5) + 'px';
    }
    moveBackground(true);
  } else if (game_character[0].move_left == true) {
    for (var i = 0; i < obstacles.length; i++) {
      obstacles_element[i].style.left = (obstacles[i].left += 5) + 'px';
    }
    for (var i = 0; i < arrows_properties.length; i++) {
      arrows_element[i].style.left = (arrows_properties[i].left += 5) + 'px';
    }
    moveBackground(false);
  }
  // moves groundtexture;
  game_ground_element.style.backgroundPositionX =  obstacles[0].left + 'px';
}
function moveBackground(state) {
  // state true -> right
  // state false -> left
  if (state) {
    background_move_counter -= 0.2;
    trees_counter -= 0.1;
    for (var i = 0; i < scenery_objects_elements.length; i++) {
      scenery_objects_properties[i].move_counter -= scenery_objects_properties[i].speed;
      scenery_objects_elements[i].style.left = scenery_objects_properties[i].move_counter + 'px';
    }
    for (var i = 0; i < booster_element.length; i++) {
      booster_element[i].style.left = (booster_properties[i].left -= scenery_objects_properties[9].speed) + 'px';
    }
  } else {
    background_move_counter += 0.2;
    trees_counter += 0.1;
    for (var i = 0; i < scenery_objects_elements.length; i++) {
      scenery_objects_properties[i].move_counter += scenery_objects_properties[i].speed;
      scenery_objects_elements[i].style.left = scenery_objects_properties[i].move_counter + 'px';
    }
    for (var i = 0; i < booster_element.length; i++) {
      booster_element[i].style.left = (booster_properties[i].left += scenery_objects_properties[9].speed) + 'px';
    }
  }
  game_content_element.style.backgroundPositionX = background_move_counter + 'px';
  trees.style.backgroundPositionX = trees_counter + 'px';
}
// move all enemies
function moveEnemies() {
  for (var i = 0; i < enemies_elements.length; i++) {
    if (enemies_properties[i] != null) {
      moveEnemy(i);
    }
  }
}
// move enemies
function moveEnemy(index) {
  if (shotHitboxScan(game_character[0].position_x, game_character[0].position_y, 
    game_character[0].width, game_character[0].height,
    enemies_properties[index].left, enemies_properties[index].top, enemies_properties[index].width,
    enemies_properties[index].height)) {
      return;
  }
  // check borders
  enemyBorders(index);
  // calculate next position
  let next_pos = 0;
  // character movement 
  next_pos += characterMovement();
  enemies_properties[index].left_border += next_pos;
  enemies_properties[index].right_border += next_pos;
  // enemy movement
  next_pos += enemyMovement(index);
  // change position accordingly
  enemies_elements[index].style.left = (enemies_properties[index].left += next_pos) + 'px';
  
}
function enemyMovement(index) {
  if (enemies_properties[index].direction == "left") {
    return -5;
  } else {
    return 5;
  }
}
function characterMovement() {
  if (game_character[0].move_left == false && game_character[0].move_right == false) {
    return 0;
  }
  if (game_character[0].move_left == true) {
    return 5;
  } else {
    return -5;
  }
}
function enemyBorders(index) {
  if (enemies_properties[index].left <= enemies_properties[index].left_border) {
    enemies_properties[index].direction = "right";
  }
  if (enemies_properties[index].left >= enemies_properties[index].right_border) {
    enemies_properties[index].direction = "left";
  }
}
// character jumps
function jumpCharacter(x) {
  let yPos = Math.sin(x/15) * (1.5 * game_character_element.clientHeight);
  if (yPos >= 0) {
    game_character_element.style.top = (game_character[0].base - yPos) + 'px';
    game_character[0].position_y = (game_character[0].base - yPos);
  } else {
    // end of jump
    // check, if there is a ground beneath
    game_character_element.style.top = (game_character[0].base) + 'px';
    game_character[0].jump = false;
    game_character[0].start_jump_time = -1;
    game_character[0].position_y = (game_character[0].base);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
