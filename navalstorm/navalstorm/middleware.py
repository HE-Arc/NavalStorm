from django.http import HttpResponse, HttpResponseRedirect

# class AuthRequiredMiddleware(object):
#     def process_request(self, request):
#         redirect_url = '/admin/login'

#         if not request.user.is_authenticated() and request.path != redirect_url:
#             return HttpResponseRedirect(redirect_url)
#         return None



class DisableCSRF(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
        response = self.get_response(request)
        return response