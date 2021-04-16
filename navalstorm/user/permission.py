from rest_framework import permissions

class isSelfUser(permissions.BasePermission):
    def has_permission(self, request, view):
        userNS = view.get_object()
        return request.user.id == userNS.user.id