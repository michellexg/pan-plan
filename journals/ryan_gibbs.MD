## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

02/23/23
Finished up authorization/authentication, successfully protected one endpoint, simple process so didn't completely protect all endpoints to give others a chance to work on that. Started working on front end, page to allow users to see a recipes details. Big aha when trying to create dynamic links, realized I could map through the array of recipes and create a route for each one off of the ID. Took awhile to get there. Very fun to complete this.

02/22/23
Today we all worked together on authorization. It was a major pain in the butt and we got stuck with the login right after the user is created. We were successfully creating the user but logging in and receiving the token was not working.

I worked on my own after class; I spent a lot of time tracing the flow inside of the source code for jwt-down. Had to look at Passlib documentation to figure out what was going on with pwd_context.verify. Finally realized that it was supposed to compare a plain password to the saved hashed one, and confirm if they matched, rather than comparing the hashed input password to the saved hashed password. Very satisfying to figure out.

02/21/23
Today we worked on getting all of our merge requests completed and making sure everything worked properly after that was completed.

The big aha moment was realizing that making merge requests when there is a massive queue of people who's code all touches the same stuff is a hassle and not very fun.

02/16/23
Today we all worked on getting our migrations in order and getting api end points setup for creating recipes and users.

On my own I worked on getting api end points setup for getting user details and getting a list of all created recipes. I was having some difficulty with creating the individual instances of the recipes after getting all the columns from the SQL tables, but once I started liberally using print statements it went much smoother.
