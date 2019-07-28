json.user_name @message.user.name
json.content @message.content
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.user_id
json.image @message.image.url