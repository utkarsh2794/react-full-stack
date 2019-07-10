$(document).ready(function(){
  //Assignment 4 Task 2
  $("#reserveButton").click(function(){
      $('#reserveModal').modal('show')
  });
  //Assignment 4 Task 3
  $("#loginButton").click(function(){
      $('#loginModal').modal('show')
  });
  $("#mycarousel").carousel( { interval: 2000 } );
  $("#carouselButton").click(function(){
      if ($("#carouselButton").children("span").hasClass('fa-pause')) {
          $("#mycarousel").carousel('pause');
          $("#carouselButton").children("span").removeClass('fa-pause');
          $("#carouselButton").children("span").addClass('fa-play');
      }
      else if ($("#carouselButton").children("span").hasClass('fa-play')){
          $("#mycarousel").carousel('cycle');
          $("#carouselButton").children("span").removeClass('fa-play');
          $("#carouselButton").children("span").addClass('fa-pause');                    
      }
  });
});