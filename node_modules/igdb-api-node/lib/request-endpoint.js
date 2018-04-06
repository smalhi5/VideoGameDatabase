"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _performRequest = _interopRequireDefault(require("./perform-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _default = function _default(endpoint, options, fields, apiService) {
  if (!endpoint) {
    return Promise.reject(new Error('No API endpoint provided'));
  }

  var url = "".concat(apiService.url, "/").concat(endpoint, "/");

  if (options) {
    url = Object.keys(options).reduce(function (url, parameter) {
      var _url$options;

      var parameterValue = options[parameter];

      switch (parameter) {
        case 'filters':
          (_url$options = url.options).push.apply(_url$options, _toConsumableArray(Object.keys(parameterValue).reduce(function (optionUrls, filter) {
            var splitFilter = filter.split('-').join('][');
            optionUrls.push("filter[".concat(splitFilter, "]=").concat(parameterValue[filter]));
            return optionUrls;
          }, [])));

          break;

        case 'ids':
          url.baseUrl += parameterValue.join(',');
          break;

        case 'expand':
          url.options.push("expand=".concat(parameterValue.join(',')));
          break;

        case 'limit':
          {
            var limit = parseInt(parameterValue, 10);

            if (limit > 50) {
              url.baseUrl += 'pro/';
            }

            url.options.push("".concat(parameter, "=").concat(parameterValue));
            break;
          }

        default:
          url.options.push("".concat(parameter, "=").concat(parameterValue));
      }

      return url;
    }, {
      baseUrl: url,
      options: []
    });

    if (fields) {
      url.options.push("fields=".concat(fields.join(',')));
    }

    url = "".concat(url.baseUrl, "?").concat(url.options.join('&'));
  }

  return (0, _performRequest.default)(url, apiService);
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2pzL3JlcXVlc3QtZW5kcG9pbnQuanMiXSwibmFtZXMiOlsiZW5kcG9pbnQiLCJvcHRpb25zIiwiZmllbGRzIiwiYXBpU2VydmljZSIsIlByb21pc2UiLCJyZWplY3QiLCJFcnJvciIsInVybCIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJwYXJhbWV0ZXIiLCJwYXJhbWV0ZXJWYWx1ZSIsInB1c2giLCJvcHRpb25VcmxzIiwiZmlsdGVyIiwic3BsaXRGaWx0ZXIiLCJzcGxpdCIsImpvaW4iLCJiYXNlVXJsIiwibGltaXQiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7ZUFZZSxrQkFBQ0EsUUFBRCxFQUFXQyxPQUFYLEVBQW9CQyxNQUFwQixFQUE0QkMsVUFBNUIsRUFBMkM7QUFDdEQsTUFBSSxDQUFDSCxRQUFMLEVBQWU7QUFDWCxXQUFPSSxRQUFRQyxNQUFSLENBQWUsSUFBSUMsS0FBSixDQUFVLDBCQUFWLENBQWYsQ0FBUDtBQUNIOztBQUVELE1BQUlDLGdCQUFTSixXQUFXSSxHQUFwQixjQUEyQlAsUUFBM0IsTUFBSjs7QUFFQSxNQUFJQyxPQUFKLEVBQWE7QUFDVE0sVUFBTUMsT0FBT0MsSUFBUCxDQUFZUixPQUFaLEVBQXFCUyxNQUFyQixDQUE0QixVQUFDSCxHQUFELEVBQU1JLFNBQU4sRUFBb0I7QUFBQTs7QUFDbEQsVUFBTUMsaUJBQWlCWCxRQUFRVSxTQUFSLENBQXZCOztBQUVBLGNBQVFBLFNBQVI7QUFDSSxhQUFLLFNBQUw7QUFDSSw4QkFBSVYsT0FBSixFQUFZWSxJQUFaLHdDQUFvQkwsT0FBT0MsSUFBUCxDQUFZRyxjQUFaLEVBQTRCRixNQUE1QixDQUFtQyxVQUFDSSxVQUFELEVBQWFDLE1BQWIsRUFBd0I7QUFDM0UsZ0JBQU1DLGNBQWNELE9BQU9FLEtBQVAsQ0FBYSxHQUFiLEVBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFwQjtBQUVBSix1QkFBV0QsSUFBWCxrQkFBMEJHLFdBQTFCLGVBQTBDSixlQUFlRyxNQUFmLENBQTFDO0FBQ0EsbUJBQU9ELFVBQVA7QUFDSCxXQUxtQixFQUtqQixFQUxpQixDQUFwQjs7QUFNQTs7QUFFSixhQUFLLEtBQUw7QUFDSVAsY0FBSVksT0FBSixJQUFlUCxlQUFlTSxJQUFmLENBQW9CLEdBQXBCLENBQWY7QUFDQTs7QUFFSixhQUFLLFFBQUw7QUFDSVgsY0FBSU4sT0FBSixDQUFZWSxJQUFaLGtCQUEyQkQsZUFBZU0sSUFBZixDQUFvQixHQUFwQixDQUEzQjtBQUNBOztBQUVKLGFBQUssT0FBTDtBQUFjO0FBQ1YsZ0JBQU1FLFFBQVFDLFNBQVNULGNBQVQsRUFBeUIsRUFBekIsQ0FBZDs7QUFFQSxnQkFBSVEsUUFBUSxFQUFaLEVBQWdCO0FBQ1piLGtCQUFJWSxPQUFKLElBQWUsTUFBZjtBQUNIOztBQUNEWixnQkFBSU4sT0FBSixDQUFZWSxJQUFaLFdBQW9CRixTQUFwQixjQUFpQ0MsY0FBakM7QUFDQTtBQUNIOztBQUVEO0FBQ0lMLGNBQUlOLE9BQUosQ0FBWVksSUFBWixXQUFvQkYsU0FBcEIsY0FBaUNDLGNBQWpDO0FBN0JSOztBQWdDQSxhQUFPTCxHQUFQO0FBQ0gsS0FwQ0ssRUFvQ0g7QUFDQ1ksZUFBU1osR0FEVjtBQUVDTixlQUFTO0FBRlYsS0FwQ0csQ0FBTjs7QUF5Q0EsUUFBSUMsTUFBSixFQUFZO0FBQ1JLLFVBQUlOLE9BQUosQ0FBWVksSUFBWixrQkFBMkJYLE9BQU9nQixJQUFQLENBQVksR0FBWixDQUEzQjtBQUNIOztBQUVEWCxvQkFBU0EsSUFBSVksT0FBYixjQUF3QlosSUFBSU4sT0FBSixDQUFZaUIsSUFBWixDQUFpQixHQUFqQixDQUF4QjtBQUNIOztBQUVELFNBQU8sNkJBQWVYLEdBQWYsRUFBb0JKLFVBQXBCLENBQVA7QUFDSCxDIiwiZmlsZSI6InJlcXVlc3QtZW5kcG9pbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGVyZm9ybVJlcXVlc3QgZnJvbSAnLi9wZXJmb3JtLXJlcXVlc3QnO1xuXG4vKipcbiAqIENvbXBvc2VzIGFuZCBzZW5kcyBhbiBBUEkgcmVxdWVzdCBVUkwgYmFzZWQgb24gcHJvdmlkZWQgZmllbGRzIGFuZCBvcHRpb25zLlxuICogQGFyZyB7c3RyaW5nfSBlbmRwb2ludFxuICogQGFyZyB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBhcmcge0FycmF5fSBbZmllbGRzXVxuICogQGFyZyB7b2JqZWN0fSBbYXBpU2VydmljZV1cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59XG4gKiBAZXhhbXBsZVxuICogcmVxdWVzdEVuZHBvaW50KCdleGFtcGxlJywgeyBmaWVsZHM6ICcqJywgbGltaXQ6IDEwIH0sIFsnaWQnLCAnbmFtZSddLCAnZXhhbXBsZS1hcGkta2V5LTEyMycpLnRoZW4oY29uc29sZS5sb2cpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChlbmRwb2ludCwgb3B0aW9ucywgZmllbGRzLCBhcGlTZXJ2aWNlKSA9PiB7XG4gICAgaWYgKCFlbmRwb2ludCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBBUEkgZW5kcG9pbnQgcHJvdmlkZWQnKSk7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IGAke2FwaVNlcnZpY2UudXJsfS8ke2VuZHBvaW50fS9gO1xuXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgdXJsID0gT2JqZWN0LmtleXMob3B0aW9ucykucmVkdWNlKCh1cmwsIHBhcmFtZXRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVyVmFsdWUgPSBvcHRpb25zW3BhcmFtZXRlcl07XG5cbiAgICAgICAgICAgIHN3aXRjaCAocGFyYW1ldGVyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsdGVycyc6XG4gICAgICAgICAgICAgICAgICAgIHVybC5vcHRpb25zLnB1c2goLi4uT2JqZWN0LmtleXMocGFyYW1ldGVyVmFsdWUpLnJlZHVjZSgob3B0aW9uVXJscywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGxpdEZpbHRlciA9IGZpbHRlci5zcGxpdCgnLScpLmpvaW4oJ11bJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblVybHMucHVzaChgZmlsdGVyWyR7c3BsaXRGaWx0ZXJ9XT0ke3BhcmFtZXRlclZhbHVlW2ZpbHRlcl19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uVXJscztcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpZHMnOlxuICAgICAgICAgICAgICAgICAgICB1cmwuYmFzZVVybCArPSBwYXJhbWV0ZXJWYWx1ZS5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZXhwYW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdXJsLm9wdGlvbnMucHVzaChgZXhwYW5kPSR7cGFyYW1ldGVyVmFsdWUuam9pbignLCcpfWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xpbWl0Jzoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KHBhcmFtZXRlclZhbHVlLCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbWl0ID4gNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybC5iYXNlVXJsICs9ICdwcm8vJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cmwub3B0aW9ucy5wdXNoKGAke3BhcmFtZXRlcn09JHtwYXJhbWV0ZXJWYWx1ZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdXJsLm9wdGlvbnMucHVzaChgJHtwYXJhbWV0ZXJ9PSR7cGFyYW1ldGVyVmFsdWV9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGJhc2VVcmw6IHVybCxcbiAgICAgICAgICAgIG9wdGlvbnM6IFtdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWVsZHMpIHtcbiAgICAgICAgICAgIHVybC5vcHRpb25zLnB1c2goYGZpZWxkcz0ke2ZpZWxkcy5qb2luKCcsJyl9YCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cmwgPSBgJHt1cmwuYmFzZVVybH0/JHt1cmwub3B0aW9ucy5qb2luKCcmJyl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVyZm9ybVJlcXVlc3QodXJsLCBhcGlTZXJ2aWNlKTtcbn07XG4iXX0=