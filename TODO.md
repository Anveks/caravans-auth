/USERS/PROFILE
request > middleware adds "user" header if token is present (and puts the decoded token there) > controller extracts the user data from the user header > sends it to the service > gets all the additional data

or: can put all the user data in the token and decode it without getting anything from the db
