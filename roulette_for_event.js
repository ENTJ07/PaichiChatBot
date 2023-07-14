let i = 0;
let start = false;
let clip = [0, 0, 0, 0, 0];
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(msg == "/룰렛 시작"){
    i = 0;
    clip = [0, 0, 0, 0, 0];
    let num = Math.floor(Math.random()*clip.length);
    clip[num] = 1;    
    replier.reply("탄창은 6칸이며 그 중 한 칸에만 장전되어 있습니다.\n");
    replier.reply("많이 발사할수록 보상은 커질 것이며 총을 맞으면 모두 사라집니다.\n");
    start = true;
  }
  ///////////0////////////
  if (msg === "r"){
    if (start === true){
      if (clip[i]) {
        replier.reply("game over\n");
        replier.reply("발사 횟수: " + (i + 1));
        start = false;
      }
      else {
        replier.reply("reward enhancement\n");
        i++;
      }
    } 
  }
  else if(msg === "s") {
    replier.reply("종료");
    replier.reply("발사 횟수: " + i);
    start = false;
  }
}