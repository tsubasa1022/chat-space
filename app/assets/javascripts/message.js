$(function(){
    function buildHTML(message){ 
      var img = message.image ? `<img class="__image" src=${ message.image }>` : ``;
      var html = `<div class="message" data-message-id= ${message.message_id}>
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

   var buildMessageHTML = function(message) {
    var img = message.image ? `<img class="__image" src=${ message.image }>` : ``;
      var html = `<div class="message" data-message-id= ${message.message_id} >
                                <div class="message__upper-info">
                                  <p class="message__upper-info--user"> 
                                    ${message.user_name} 
                                  </p>
                                  <p class="message__upper-info--date">
                                    ${message.time}
                                  </p>
                                </div>
                                <div class="message__lower-info">
                                  <p class="message__lower-info__text">
                                    ${message.content}
                                  </p>
                                </div>
                                <div class="__image">
                                  ${ img }
                                </div>
                              </div>`
    return html;
  }
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('message-id'); 
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        if(messages !== undefined){
          messages.forEach(function(message){
          
          var insertHTML = buildMessageHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          
          })
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
  };
  setInterval(reloadMessages, 5000);
});
