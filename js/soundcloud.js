//sound cloud jukebox

class SCJukebox{
    constructor(id){
            this.id = id ;
            this.SCplaylist = [];
            // var currentTrack = 0;


    }

    initSC(){

            SC.initialize({
                 client_id: 'ebe2d1362a92fc057ac484fcfb265049'
                  // client_id: this.id
            });
          }



      // 336768726
 getTrackById(id){
      console.log(id);
      // var id = this.value;
      var promise =  new Promise(function(resolve, reject){
      SC.get('/tracks/'+ id ).then(function(response) {
console.log(response);
            resolve(response);
              });

    });
    return promise;

  }


    getTracksByTerm(term){
    // if(this.playedOnce > 0){
    //   document.getElementById('songs-div').remove();
    // } else {
    //   this.playedOnce++
    // }
    var promise = new Promise(function(resolve, reject){
          SC.get('/tracks', {
                      q: term
                }).then(function(response){
                        var tracks = [];
                        console.log(tracks);
                        response.forEach(function(cur){
                          tracks.push(cur);
                       });
                  resolve(tracks);
                });
              });
        return promise;
  }




getPlaylist(){
          return this.playlist;
          }


setPlaylist(arr){

            for (var i=0; i<arr.lenght; i++){
              this.playlist.push(arr[i]);
      }
   }

streamById(trackId){

        SC.stream('/tracks/' + trackId).then(function(player) {
                console.log(player);

                player.play();

            document.getElementById('play').addEventListener('click', function(){
              console.log(trackId);
                player.play();
          });
            document.getElementById('pause').addEventListener('click', function(){
                player.pause();
          });
            document.getElementById('stop').addEventListener('click', function(){
                player.pause();
                player.seek(0);
          });
          // player.on('finish', function(){
          //    currentTrack += 1
          //    getTrackById(id);
          // });

   });
 }

 diplaySongsResult(song){

     document.getElementById('playlist').innerHTML = response.title;

     document.getElementById('artwork').src = tracks[current].artwork_url || 'http://' + q + '.jpg.to'

 }


} //end class

function init(){
        var sound = new SCJukebox();


    //     //336768726
      sound.initSC();

           document.getElementById('track-id').addEventListener('change', function() {
             var userInput = this.value;
                 sound.getTrackById(userInput).then(function(result){
                    sound.displaySongsResult(result);
                      sound.setPlaylist([result]);
                        sound.streamById(userInput);
                 });
          });

          document.getElementById('search').addEventListener('change', function() {
            var userInput = this.value;
             sound.  getTracksByTerm(userInput).then(function(result){
               sound.setPlaylist(result);
                 sound.getPlaylist().forEach(function(current){
                   sound.displaySongsResult(current);
                 });
                      sound.streamById(sound.getPlaylist()[0].id);
              });
          });

        }//end function init()

init();
