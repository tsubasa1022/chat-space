$(function() {
  function incHtml(users){
    var html = ` <div class= "chat-group-user clearfix" >
                    <p class= "chat-group-user__name">
                      ${ users.user_name }
                    </p>
                    <a class= "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ users.user_id } data-user-name=${ users.user_name }>
                    追加
                    </a>
                 </div>`
          return html
    };
  
  function errHtml(msg){
    var html = ` <div class= "chat-group-user clearfix" >
    <p class= "chat-group-user__name">
      ${ msg }
    </p>
 </div>`
          return html
  };

  function userAppHtml(user){
    var html = `<div class='chat-group-user clearfix'>
    <input name='group[user_ids][]' type='hidden' value=${ user.userId }>
    <p class='chat-group-user__name'>${ user.userName }</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
        return html
  };

  $('.chat-group-form__input').on('keyup paste',function(e){
    e.preventDefault();
    var input = $(this).val();
    if(input.length !== 0){
      $.ajax({
        type:'GET',
        url: '/users#index',
        data:  { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if(users.length !== 0){
          users.forEach(function(user){
            var html = incHtml(user)
            $('#user-search-result').append(html);
            });
        }
        else{
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
  });
    
    $('#user-search-result').on('click', ".user-search-add", function(){
      console.log(this);
      var userInfo = $(this).data();
      var html = userAppHtml(userInfo)
      $('.chat-group-users').append(html)
      $(this).parent().remove();
  });
    $('.chat-group-users').on('click', '.user-search-remove',function(){
      $(this).parent().remove();
    });
    $('.user-search-remove').on('click', function(){
      $(this).parent().remove();
    });
});