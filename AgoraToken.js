// agora SDK already installed
// adding agora tokens into the file
const APP_ID = '899c2029005d482885b175e4fb584f7f';
const TOKEN =
  '007eJxTYAi9tvd6vyHnz6jE3782/pi8Kdtxird2fuflG7n5ib1qx6YrMFhYWiYbGRhZGhiYpphYGFlYmCYZmpummqQlmVqYpJmnWb/STG8IZGTwmlbNyMgAgSA+C0NuYmYeAwMA1o8ggg==';
const CHANNEL = 'main';

/*
to gennerate the token : 
    step 1 > log in on https://console.agora.io/
    step 2 > move to projects 
    step 3 > if no project create new project with use case Social / Chatroom (my premade project name : video calling agora)
    step 4 > configure  > for new project delete certificate > gennerate temp  rtc token 
    step 5 > give channel name 
    step 6 > copy app id , channel name , temp token (token refresh every 24 hrs , need to be set manually for now)
*/

// future tasks -> create a way to genrate tokens dynamically such that not needed to manually update every 24hrs

export default { APP_ID, TOKEN, CHANNEL };
