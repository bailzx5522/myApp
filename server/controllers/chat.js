

exports.get = function(req, res) {
  return res.sendFile(__dirname + '/test_chat.html')
  //return res.render('chat', {
  //  title: "chat room",
  //})
}
