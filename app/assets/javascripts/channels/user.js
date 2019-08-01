$(function() {
  function incHtml(users){
    var html = ` <div class= "chat-group-user clearfix" >
                    <p class= "chat-group-user__name">
                      ${ users.user_name }
                    </p>
                 </div>`
          return html
    }
  
  function errHtml(msg){
    var html = ` <div class= "chat-group-user clearfix" >
    <p class= "chat-group-user__name">
      ${ msg }
    </p>
 </div>`
          return html
  }

  $('#user-search-field').on('keyup paste',function(e){
    e.preventDefault();
    var input = $(this).val()  
    if(input.length !== 0){
      $.ajax({
        type:'GET',
        url: '/users#index',
        data:  { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        if(users.length !== 0){
          $('#user-search-result').empty();
          users.forEach(function(user){
          var html = incHtml(user)
          $('#user-search-result').append(html)
        })
        }else{
          $('#user-search-result').empty();
          var html = errHtml('一致するユーザーが見つかりません')
          $('#user-search-result').append(html)
        }
      })
      .fail(function() {
        alert('検索に失敗しました');
      })
    }else{
      $('#user-search-result').empty();
    }
  })
});