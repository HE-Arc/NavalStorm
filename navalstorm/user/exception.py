from rest_framework.exceptions import APIException

class UserUpdateError(APIException):
    def init(self, msg):
        APIException.init(self, msg)
        self.message = msg


class BoardUpdateError(APIException):
    def init(self, msg):
        APIException.init(self, msg)
        self.message = msg

