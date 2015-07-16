function buildSphere(params) {
     
    //Default Options
    //params - is an object which is creating depending on the FORM fields' values
    if (!params) var params = {};
    var vSegments = params.vSegments||16;
    var hSegments = params.hSegments||32;
    var radius = params.radius || 200;
    var duration = params.duration || 4000;
    var backfaceVisibility = params.backfaceVisibility || "visible";
    var delay = params.delay || 10;
    var faceWidth = params.faceWidth || 20;
    var faceHeight = params.faceHeight || 20;
    var faceText = params.faceText || "";
    var faceOpacity = params.faceOpacity || 1;
    var faceBorderRadius = params.faceBorderRadius || 0;
     
    // Get our #container3d
    var container = document.getElementById("container3d");
    var containerHTML = "";
     
    //Now we need to add vSegments*hSegments number of .face divs inside of #container3d
    for (var i = 1; i <= vSegments*hSegments; i++) {
        containerHTML+='<div class="face">'+faceText+'</div>';  
    }
     
    container.innerHTML=containerHTML;
     
    //All faces
    var faces = document.querySelectorAll('.face')
     
    //Now we need to apply all transforms parameters for the each face
    for (var i=0; i<=faces.length-1; i++) {
        /*
        i - index number of Face
        vIndex - vertical index number in faces grid
        hIndex - horizontal index nmber in faces grid
        */
        var hIndex = i - Math.floor(i/hSegments)*hSegments;
        var vIndex = Math.floor(i/hSegments);
         
        //Faces X and Y rotate angles
        var newX = 360/(vSegments)*vIndex/2;
        var newY = 360/(hSegments)*hIndex;
         
        //Faces Background Color
        var color = i%2==0?"#151515":"#7CFC00"
         
        //Face Styling
        var face = faces.item(i)
        var faceStyle = face.style
         
        /* Styling */
        faceStyle.width = faceWidth+"px";
        faceStyle.height = faceHeight+"px";
        faceStyle.opacity = faceOpacity;
        faceStyle.borderRadius = faceBorderRadius+"px";
        faceStyle.backgroundColor = color;
        /* End of styling */
         
        /* For Webkit */
        if ("webkitTransform" in faceStyle) {
            faceStyle.webkitBackfaceVisibility = backfaceVisibility
            /* Set new transition duration, delay and faces transform to start animation: */
            faceStyle.webkitTransitionDuration = duration/1000+"s";
            faceStyle.webkitTransitionDelay = i*delay/1000+"s";
                //Actually translateZ is the variable that determines the radius of the sphere!
            faceStyle.webkitTransform = "rotateX("+newX+"deg) rotateY("+newY+"deg) rotateZ(0deg) scale3d(1,1,1) translate3d(0px,0px,"+radius+"px)";
        }
         
        /* For Firefox */
        if ("MozTransform" in faceStyle) {
            faceStyle.MozBackfaceVisibility = backfaceVisibility
            faceStyle.MozTransitionDuration = duration/1000+"s"
            faceStyle.MozTransitionDelay = i*delay/1000+"s"
        }
    }
    /* 
    Some kind of hack for FF, it will not animate faces right after their creation, 
    FF requires some kind of "ready" state for it, so let make this loop again after 0 timeout:
    */
    if ("MozTransform" in faceStyle) {
        setTimeout(function(){
            for (var i=0; i<=faces.length-1; i++) {
                 
                var hIndex = i - Math.floor(i/hSegments)*hSegments;
                var vIndex = Math.floor(i/hSegments);
                var newX = 360/(vSegments)*vIndex/2;
                var newY = 360/(hSegments)*hIndex;
                 
                faces.item(i).style.MozTransform = "rotateX("+newX+"deg) rotateY("+newY+"deg) rotateZ(0deg) scale3d(1,1,1) translate3d(0px,0px,"+radius+"px)";
            }
        },0)
    }
}
