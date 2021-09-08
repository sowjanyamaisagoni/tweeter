$(document).ready( () => {
   // console.log('ready');
   $('#tweet-text').on('input',function() {
      $(this).parent().find('.counter').html(140 - $(this).val().length);
      const counts = $(this).parent().find('.counter').html();    
      if (counts < 0) {
         $(this).parent().find('.counter').addClass('negative');     
    }else{
      $(this).parent().find('.counter').removeClass('negative');
    }
   })
});