var constant = function() {

    this.INTERNAL_SERVER_ERROR = "Internal server error.";
    this.BAD_REQUEST = "Bad request.";
    this.USER_CREATE_SUCCESS = "User created successfully.";
    this.USER_CREATE_FAILURE = "Failed to create new user.";
    this.FETCH_ALL_USER_SUCCESS = "All user fetched succesfully.";
    this.FETCH_ALL_USER_FAILURE = "Failed to fetch all users.";
    this.TODO_CREATE_FAILURE = "Failed to create TODOS.";
    this.TODO_CREATE_SUCCESS = "TODOS created successfully.";
    this.USER_TODOS_FETCHED_SUCCESS = "Users todos fetched successfully.";
    this.USER_TODOS_FETCHED_FAILURE = "Failed to fetch users todos.";
};


module.exports = new constant();
