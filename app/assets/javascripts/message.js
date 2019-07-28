$(function(){
    function buildHTML(message){ 
      if (message.image){
        var img = `<img class="__image" src=${ message.image }>`
      }else{
        var img = ""
      }
      var html = `<div class="message">
                             <div class="message__upper-info">
                                 <p class="message__upper-info--user">
                                     ${ message.user_name }
                                   
                                 </p>
                                 <p class="message__upper-info--date">
                                     ${ message.time }
                                 </p>
                             </div>
                             <div class="message__lower-info">
                                 <p class="message__lower-info__text">
                                     ${ message.content }
                                 </p>
                             </div>
                             <div class="__image">
                              ${ img }
                             </div>
                         </div>`
            return html
      }
  $(".new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $(".new_message")[0].reset();
      $('.send-btn').attr('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
     })
     .fail(function(){
      alert('メッセージを入力してください');
      $('.send-btn').attr('disabled', false);
     })
   })
})