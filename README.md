Translation of FreeCodeCamp to Indonesia Language by Santren Koding

# Offline version of Freecodecamp for Windows
**************************
       INSTALLATION
**************************

(1.) Download and install nodejs 4.x.x, mongodb 3.x.x, and  7-zip.

(2.) After downloading/cloning this repository, navigate to folder and 
       extract the three .7z files for data,public and node_modules folders to the immediate directory.
      Note the tree below  to avoid duplication of the folders.
	
	master:.
	+---.github
	+---client  
	+---common
	+---config
	+---data
	¦   +   ...
	+---node_modules
	¦   +---.bin
	¦   +---accepts
	¦   +---adler32
	¦   +---async
	¦   +---babel-cli
	¦   +	...
	+---public
	¦   +---bower_components
	¦   +---css
	¦   +---fonts
	¦   +	...
	+---test	

(3. ) In the folder, open a command line interface by typing
      "cmd" in the address bar and pressing enter.

(4.) Check if nodejs and mongodb are added to your PATH variable.
 	For mongodb, open a command line interface and type "mongod --version". 
    The result should be  v3.x.x. If it is not recognized
    as an internal or external. Add
   C:\Program Files\MongoDB\Server\3.0\bin to your PATH variable
   (depends on where mongodb was installed on your system).
   For nodejs check "node --version". Repeat similar steps as above, if
   missing.




*******************************
       RUNNING THE SOFTWARE
*******************************

(1.) Open the folder ,then open a command line interface by typing "cmd" in the address bar
  and pressing enter. Run the mongodb database by typing
  the command "database" and press enter.

(2.)In this folder. Open another command line 
    interface by typing "cmd" in the address bar and pressing enter.
   Start the application by typing the command "gulp" and press enter.
   Wait till you see these lines

	[BS] Watching files...
	no original function chain to wrap
  	fcc:user:remote setting up user hooks +0ms
	Browse your REST API at http://127.0.0.1:3000/explorer
	FreeCodeCamp server listening on port 3000 in development
	https redirect listening on port 1337

Then open localhost:3000 in your  browser.

* A default email and password has been provided for you to
 sign in keep track of your progress:

	email=> username@email.com
	password=> password

	

*If you choose to create account, signing up will give an error, but 
 you can still go ahead to use the chosen email and password   to
 login in to your account.

*If you get "Loop Back error" exit your server and restart again by 
pressing CTRL + C twice. Then run "gulp" command again.
Done!






