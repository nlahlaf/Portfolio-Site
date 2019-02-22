$(document).ready(function(){
    
    $("#filter-all").addClass("active");
    setFilters();
    
    if (performance.navigation.type == 1) {
        setFilters();
    }
    
    function setThumbnailSizes(){
        var a = document.getElementsByClassName("project-carousel");
        var thumbnailHeightsloc = [];
        for(var j=0; j<a.length; j++){
            var x = a[j].getElementsByTagName("li");
            for(var i=0; i<x.length; i++){
            var im = x[i].getElementsByTagName("img");
            var theImage = new Image();
            theImage.src = $(im).attr("src");
            var w = theImage.width;
            var h = theImage.height;
            var rat = w/h;
            var newHeight = rat*180;
             thumbnailHeightsloc.push(newHeight);
            $(x[i]).css("width", newHeight);
        }
        }         
        return thumbnailHeightsloc;
    }
    
    function resetModal(){
        $(".project-carousel").carousel(0);
        var indicatorBox = $(".project-carousel .carousel-indicators");
        $(indicatorBox).scrollLeft(0);
    }
    
    $(".project-carousel").on('slid.bs.carousel', function (){
        var t = $("#"+this.id+" .thumbnail.active");
        var x = $(t).attr("data-slide-to");
        var offset=0;
        for(var i=0; i<x; i++){
            if(this.id=="poggio-project-carousel"){
                offset+=thumbnailHeights[i];
            }
            else if(this.id=="mystory-project-carousel"){
              offset+=thumbnailHeights[i+18];
            }
            else if(this.id=="drawings-project-carousel"){
              offset+=thumbnailHeights[i+27];
            }
            else if(this.id=="bending-project-carousel"){
//              offset+=thumbnailHeights[i+31];
                 offset+=thumbnailHeights[i+18];
            }
        }
        var indicatorBox = $(".project-carousel .carousel-indicators");
        var w = $(window).width();
        if(w<767){
          w=0;  
        }
        var o = offset-w/3;
        $(indicatorBox).animate({
            scrollLeft: o
          });
    });
    
    $(".slide-link").click(function(){
        var x = this.classList;
        var classname = x[2];
        var projName = classname.replace("-slide-link", "");
        $("#"+projName+"-slideshow").modal({backdrop: true});
    });
    
    function getProjectList(){
        var x = document.getElementsByClassName("project-modal");
        var projectList = [];
        for(var i=0; i<x.length; i++){
            var name = x[i].id.replace("-project", "");
            name = "#" + name;
            projectList.push(name);
        }
        return projectList;
    }
    
    function getFilterTypes(){
        var x = document.getElementById("filterButtons").getElementsByTagName("button");
        var filterList = [];
        for(var i=0; i<x.length; i++){
            var name = x[i].id.replace("filter-", "");
            filterList.push(name);
        }
        return filterList;
    }
    
    $(".carousel").on('slid.bs.carousel', function (){
        var name = this.id;
        name = name.replace("-carousel", "");
        resizeModal(name);
    });
    
    $( "#pink" ).css( "display", "none" );
    $( window ).scroll(function() {
        if($(window).width()>767){
            if(window.scrollY>=74){
                $( "#pink" ).css( "display", "block" );
                $( "#head-img" ).css( "position", "fixed" );
                $( "#head-img" ).css( "top", "75px" );
                $( "#blankspace" ).css( "display", "block" );
            }
            else{
                $( "#pink" ).css( "display", "none" );
                $( "#head-img" ).css( "position", "relative" );
                $( "#blankspace" ).css( "display", "none" );
                $( "#head-img" ).css( "top", "0px" );
            }
        }
        else{
            $( "#head-img" ).css( "display", "block" );
             if(window.scrollY>=500){
                $( "#head-img" ).css( "display", "none" );
            }
            $(".navbar").addClass("affix");
            $( "#head-img" ).css( "margin-top", "50px" );
        }
      
    });
    
    if($(window).width()<=767){
        $("nav").removeClass("affix-top");

    }
    
    $(document).click(function (event) {
        if($(window).width()<=767){
            $(document).scrollTop(window.scrollY+1);
        }
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
            $("#section1, #section2, #section3, .mymodal").css("pointer-events", "auto");
        }
    });

    //hack for when resizing window to smaller
    $("button.navbar-toggle").on("click", function(event){
         var _opening = $(".navbar-collapse").hasClass("collapse in");
        if($(window).width()<=767 && window.scrollY<77 && !_opening){
            $(document).scrollTop(window.scrollY+1);
        }
        if(!_opening){
            $("#section1, #section2, #section3, .mymodal").css("pointer-events", "none");
        }
        else{
            $("#section1, #section2, #section3, .mymodal").css("pointer-events", "auto");
        }
    });
    window.onResize = checkReload;
    
    function checkReload(){
        if($(window).width()==767 || $(window).width()==768){
            location.reload();
        }
    }
    
    $( window ).resize(function() {
      checkReload();
        checkPlaceholders();
        resizeAbout();
    });

    function resizeModal(name){ //make the nested modal adjust to screen size (wide and tall)
        name = "#"+name+"-carousel";
        var thing = $(name+" .item.active").find("img");
        var theImage = new Image();
        theImage.src = thing.attr("src");
        var w = theImage.width;
        var h = theImage.height;
        var vh = $(window).height();
        var vw = $(window).width();
        var ratio = w/h;
        var newW = 0;
        var newH = 0;
        while(newW<=(0.85*vw)&&newH<=(0.85*vh)){
            newH++;
            newW+=ratio;
        }
        $(".modal-dialog").css("width", newW+"px");
        var newHeight = newH + (0.1*vh);
        $(".modal-dialog").css("height", newHeight+"px");
        $(".modal-dialog").css("margin", "auto");
    }
    
    $("#filterButtons .btn").on('click', function(event) {
        var name = this.id.replace("filter-","");
            window.location.hash=name;
        setFilters();
    });
    
    function setFilters(){ //this function reads the hash and change the button and the filters
         $("#filer-all").addClass("active");
        var filterList = getFilterTypes();
        var name = window.location.hash;
        name=name.replace("#", "");
        if(name=="gallery" || name=="" || name=="all"){
            $(".btn.active").removeClass("active");
            $("#filter-all").addClass("active");
            filterSelection("all");
        }
        else if(filterList.includes(name)){            
            var buttonid = "#filter-"+name;
            $(".btn.active").removeClass("active");
            $(buttonid).addClass('active');
            filterSelection(name);
        }
    }
    
    filterSelection("all"); // Execute the function and show all columns
    $("#filter-all").addClass("active");
    
        function filterSelection(c) {
          var x, i;
          x = document.getElementsByClassName("filters");
          if (c == "all") c = "";
          for (i = 0; i < x.length; i++) {
            removeClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
          }
            if(c!=""){
                window.location.hash = c;
            }
            checkPlaceholders();
        }
    
    function resizeAbout(){
        var h = $(".headshot").css("height");
        $(".bio, .contact").css("height", h);
    }
    
        function checkPlaceholders(){
            var x, i;
            x = document.getElementsByClassName("filters show");
            var l = x.length;
            var w = $( window ).width();
            $(".placeholder").css("display", "inline-block");
            if((l<=3 && w>1024)||(l<=2 && w<1025)){
                $(".placeholder").css("display", "none");
            }
            else{
                if(w<767){ //doesn't matter
                        $(".placeholder").css("display", "none");
                    }
                else{
                    if(w<1025){ //should be 2 per row
                        if(l%2==1){
                            $("#p2").css("display", "none");
                        }
                        else{
                            $(".placeholder").css("display", "none");
                        }
                    }
                    else{ //should be 3 per row
                        if(l%3==2){
                            $("#p2").css("display", "none");
                        }
                        if(l%3==0){
                            $(".placeholder").css("display", "none");
                        }
                    }   
                }
            }
        }

        // Show filtered elements
        function addClass(element, name) {
          var i, arr1, arr2;
          arr1 = element.className.split(" ");
          arr2 = name.split(" ");
          for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
              element.className += " " + arr2[i];
            }
          }
        }

        // Hide elements that are not selected
        function removeClass(element, name) {
          var i, arr1, arr2;
          arr1 = element.className.split(" ");
          arr2 = name.split(" ");
          for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
              arr1.splice(arr1.indexOf(arr2[i]), 1); 
            }
          }
          element.className = arr1.join(" ");
        }

    $(".navbar-brand").on('click', function(event) {
        $('.modal').modal('hide');
        x = document.getElementsByClassName("mymodal");
        var isopen=0;
          for (i = 0; i < x.length; i++) {
              if($(x[i]).css("display")=="block"){
                  isopen++;
              }
          }
         if(isopen){
             exitMyModal($('.mymodal'));
              if (this.hash !== "") {
             $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1);}
         }
    });
    
    function isOpen(){
        x = document.getElementsByClassName("mymodal");
        var isopen=0;
          for (i = 0; i < x.length; i++) {
              if($(x[i]).css("display")=="block"){
                  isopen++;
              }
          }
        return isopen;
    }
    
     $("#myNavbar a").on('click', function(event) {
         $('.modal').modal('hide');       
         if(isOpen()){
             exitMyModal($('.mymodal'));
              if (this.hash !== "") {
             $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1);}
         }
    });
    
    $(".never-active").on('click', function(event) {
        exitMyModal($('.mymodal'));
        removeClass(this, "active");
        var name = $("#filterButtons .active");
        name = $(name).attr('id');
        name = name.replace("filter-","");
        window.location.hash=name;
    });
    
    function exitMyModal(modal){
        resetModal();
        $('html').css("overflow-y", "auto");
        $(".mymodal").css("display", "none");
    }
    
    if (window.history && window.history.pushState) {

    $(window).on('popstate', function() { //every time hash changes
      var hashLocation = location.hash;
      var hashSplit = hashLocation.split("#!/");
      var hashName = hashSplit[1];
        var projectList = getProjectList();
        var hash = window.location.hash;
        if(!projectList.includes(hash)){
              if(isOpen()){
                 exitMyModal($('.mymodal'));
             }
            $('.modal').modal('hide');
        }
        //now go to correct tab
        if(hash=="#home" || hash=="#gallery" || hash=="#about" || hash=="#"){
            $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 500, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
                setFilters();
              });
        }
         var filterList = getFilterTypes();
        hash = hash.replace("#","");
        if(filterList.includes(hash)){
              setFilters();
        }
        setFilters();
    });
  } 
    
    $(".modal").on('show.bs.modal', function(){
     $("#gray-bg").css("display", "block");
    });
    
        $(".modal").on('hide.bs.modal', function(){
     $("#gray-bg").css("display", "none");
    });
    
    $(".project-link").on('click', function(event) {
        if(window.location.hash=="#about" || window.location.hash=="#home"){
             var name = $("#filterButtons .active");
            name = $(name).attr('id');
            name = name.replace("filter-","");
            window.location.hash=name;
        }
        //make sure gallery in nav is bold
        $("li.nav-link.active").removeClass("active");
        $("li.nav-link.dropdown").addClass("active");
        
      thumbnailHeights = setThumbnailSizes();
      
        var x = this.classList;
        var classname = x[2];
        var projName = classname.replace("-project-link", "");
        var projModal = $("#"+projName+"-project");
        var slideModal = $("#"+projName+"-slideshow");
//        $('html,body').css("position", "fixed");
        $(projModal).animate({scrollTop: $(projModal).offset().top}, 1);
        $('html,body').css("overflow-y", "hidden");
        projModal.css("display", "block");
        projModal.css("overflow", "auto");
        window.location.hash = "#"+projName;
    }); 
    
    goToGalHash();
    
    function goToGalHash(){
        var h = window.location.hash;
        if(h.length>0){
            var filterList = getFilterTypes();
            var n = h.slice(1);
            if(filterList.includes(n)){               
                filterSelection(n);  
                var button = "#filter-" + n;
                $(".btn.active").removeClass("active");
                $(button).addClass('active');
            }
            else{
                setFilters();
            }
            $('html,body').animate({scrollTop: $("#gallery").offset().top}, 1);
        }
    }
    
    $("#gal").on('click', function(event) {
        filterSelection("all");
        $(".btn.active").removeClass("active");
        $("#filter-all").addClass('active');
    });
    $(".galleryTypeLink").on('click', function(event) {
       if(this.id=="dropdown-painting"){
            filterSelection("painting");
            $(".btn.active").removeClass("active");
            $("#filter-painting").addClass('active');
        }
        else if(this.id=="dropdown-illustration"){
            filterSelection("illustration");
            $(".btn.active").removeClass("active");
            $("#filter-illustration").addClass('active');
        }
        else if(this.id=="dropdown-printmaking"){
            filterSelection("printmaking");
            $(".btn.active").removeClass("active");
            $("#filter-printmaking").addClass('active');
        }
        else if(this.id=="dropdown-design"){
            filterSelection("design");
            $(".btn.active").removeClass("active");
            $("#filter-design").addClass('active');
        }
        else if(this.id=="dropdown-sculpture"){
            filterSelection("sculpture");
            $(".btn.active").removeClass("active");
            $("#filter-sculpture").addClass('active');
        }
    });
    
    //for slideshow
    $(".slide-link").on('click', function(event) {
        $(".slideshow-modal .item.active").removeClass("active");
        var num = this.classList[1];
        num = num.slice(10);
        $(".slide"+num).addClass("active");
        var name = this.classList[2];
        name = name.replace("-slide-link", "");
        resizeModal(name);
    });
    
    $("#gal").hover(
      function() {
            if($(".navbar-toggle").css("display")!="block"){
                $(".myDropdown").css("display", "block");
            }
      }, function() {
       if($(".navbar-toggle").css("display")!="block"){
                $(".myDropdown").css("display", "none");
         }
      }
    );
    
    $(".myDropdown").hover(
      function() {
        if($(".navbar-toggle").css("display")!="block"){
                $(".myDropdown").css("display", "block");
            }
      }, function() {
        if($(".navbar-toggle").css("display")!="block"){
                $(".myDropdown").css("display", "none");
            }
      }
    );
    //stupid hacky thing to make submenu show in sm-
    $(".navbar-toggle").on("click", function(event){
        if($(".navbar-toggle").css("display")=="block"){
                $(".myDropdown").css("display", "block");
        }
    });

  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
          if(hash!="#gallery"){
               window.location.hash = hash;
          }
      });
    } 
  });
});