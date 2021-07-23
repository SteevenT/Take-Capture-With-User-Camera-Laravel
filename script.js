<script>
    const player = document.getElementById('player');
    const capture1 = document.getElementById('capture1');
    const capture2 = document.getElementById('capture2');
    const capture3 = document.getElementById('capture3');
    const openBouton = document.getElementById('openVideo');
    let cpt1 = 0;
    let cpt2 = 0;
    let cpt3 = 0;

    const constraints = {
      video: true,
    };
  
    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        player.srcObject = stream;
    });

    $( document ).ready(function() {
        openBouton.addEventListener("click",function() {
            if ('pictureInPictureEnabled' in document) {
                player.requestPictureInPicture().catch(function(err){
                    console.log(err);
                });
            }
        })
    });
    
function addAndSendPhoto(id, div, cpt) {
        if($('#' + id).length){
            $('#' + id).attr("id",id + cpt)
        }

        $(div).append('<canvas id="'+id+'" width=150 height=150></canvas>');
        let context1 = document.getElementById(id).getContext('2d');
        context1.drawImage(player, 0, 0, 150, 150);

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "POST",
            url: '/smqdcpWeb_v1/testPhoto',
            data: {
                imgBase64: document.getElementById(id).toDataURL(),
                pictName : id + (cpt + 1)
            },
            success: function (data){
                console.log(data);
            }
        });
    }
    
    capture1.addEventListener('click', () => {

        addAndSendPhoto('pict','#firstDiv', cpt2)
        cpt1++;

    });

    capture2.addEventListener('click', () => {
        
        addAndSendPhoto('pic','#secondDiv', cpt2)
        cpt2++;

    });

    capture3.addEventListener('click', () => {

        addAndSendPhoto('picture','#thirdDiv', cpt3)
        cpt3++;

    });
  </script>