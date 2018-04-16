JUMP AHEAD\
\
JUMP AHEAD is a web application that allows users to create websites and blogposts for their company, and view websites and blogs from other companies.  A user can sign in by entering fields like 'Organization name', 'Address', 'Email', etc, and only users associated with that company can edit that company's blogposts, images, and webpages. Any other visitors to the site are still able to view blogposts and webpages by any company by selecting from a drop down menu.\
\
Wireframes: https://i.imgur.com/kwfQEaa.jpg \
Deployed Website: https://jump-ahead-jmen.github.io/jump-ahead/ \
Link to API repo: https://github.com/jump-ahead-jmen/jump-ahead-api \
Link to deployed API: https://jump-ahead-api.herokuapp.com/ \
\
User Stories:\
As a user, I want to be able to log in and out of my account and edit my own resources.\
As a user, I want my resources to not be edited by users other than me.\
As a user, I want to be able to post blogs that others can view.\
As a user, I want to be able to post webpages that others can view.\
As a user, I want to be able to view other companys' blogs and webpages.\
As a user, I want to be able to chage my password.\
As a user, I want others to be able to see what organization I'm associated with.\
As a user, I want to be able to upload photos to my website.
\
Technologies used:\
HTML, CSS, SASS, JavaScript, AJAX, Bootstrap, Handlebars, AWS/SDK S3\
\
Unsolved Problems:\
There are several improvements yet to be made to this application in future iterations:\
-Refactor code to reflect the organization that we established to separate concerns according to the resources they pertained to. For example, we still have some event handlers that crud on the 'webpage' resource, but are located in the file intended to handle 'users' events.\
-Uploading of images is not yet supported by the application, but is a stretch goal we could achieve.\
-There's always room for improvement in styling.\
\
Planning, process, and problem-solving strategies:\
We typically began each 'chunk' of work time by having a stand-up meeting where we reviewed our progress thus far and identified short and long term goals for the future.  The biggest obstacle during this project was the proximity of the deadline for completion.  Because of this constraint, we came to a consensus that the vast majority of our time and energy should be focused on reaching an MVP, and that other concerns should be secondary to that.  Another challenge we faced was identifying the most efficient way to divide labor.  Our solution for this challenge was to begin each 'sprint' by working together on a single concern until it became clear how we could split up and simultaneously work on separate issues, which provided continuity.  
