# videoCall-using-Agora \
a video calling website which uses agora video calling SDK. It includes the function like mute and unmute microphone and camera and allow user to leave and join call.\
\
\
Steps to make this application run on your local machine \
1. Generate Token : \
   to gennerate the token : \
       step 1 > log in on https://console.agora.io/  \
       step 2 > move to projects in agora's dashboard \
       step 3 > if no project create new project with use case Social / Chatroom and save \
       step 4 > make sure the Primary Certificate is enabled \
       step 5 > inside  project : configure  > for new project delete certificate \
       step 6 > gennerate temp  rtc token 
       step 7 > give channel name \
       step 8 > copy app id , channel name , temp token (token refresh every 24 hrs , need to be set manually for now) \
       step 9 > paste the copied date in the variable fields inside "AgoraToken.js" (if some data already exits , replace it) \
       step 10 > save all the edited files \
3. Run the code on live server with internet access. \
