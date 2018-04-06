"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function get() {
    return _configuration.default;
  }
});
exports.default = void 0;

var _configuration = _interopRequireDefault(require("../configuration"));

var _endpoints = _interopRequireDefault(require("./endpoints"));

var _getImage = _interopRequireDefault(require("./get-image"));

var _scrollAll = _interopRequireDefault(require("./scroll-all"));

var _tagNumber = _interopRequireDefault(require("./tag-number"));

var _parseEndpoint = _interopRequireDefault(require("./parse-endpoint"));

var _performRequest = _interopRequireDefault(require("./perform-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(apiKey) {
  var apiService = _configuration.default.threeScale;
  apiService.key = apiKey || process.env.IGDB_API_KEY || process.env['3scaleKey'] || process.env.mashapeKey || global.IGDB_API_KEY || global['3scaleKey'] || global.mashapeKey;
  return _endpoints.default.reduce(function (endpointObj, endpoint) {
    endpointObj[endpoint] = (0, _parseEndpoint.default)(endpoint, apiService);
    return endpointObj;
  }, {
    image: _getImage.default,
    tagNumber: _tagNumber.default,
    scroll: function scroll(url) {
      return (0, _performRequest.default)("".concat(apiService.url).concat(url), apiService);
    },
    scrollAll: function scrollAll(url, options) {
      return (0, _scrollAll.default)(url, options, apiService, _performRequest.default);
    }
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImFwaVNlcnZpY2UiLCJ0aHJlZVNjYWxlIiwia2V5IiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIklHREJfQVBJX0tFWSIsIm1hc2hhcGVLZXkiLCJnbG9iYWwiLCJyZWR1Y2UiLCJlbmRwb2ludE9iaiIsImVuZHBvaW50IiwiaW1hZ2UiLCJ0YWdOdW1iZXIiLCJzY3JvbGwiLCJ1cmwiLCJzY3JvbGxBbGwiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7ZUFRZSwwQkFBVTtBQUNyQixNQUFNQSxhQUFhLHVCQUFPQyxVQUExQjtBQUVBRCxhQUFXRSxHQUFYLEdBQWlCQyxVQUFVQyxRQUFRQyxHQUFSLENBQVlDLFlBQXRCLElBQXNDRixRQUFRQyxHQUFSLENBQVksV0FBWixDQUF0QyxJQUFrRUQsUUFBUUMsR0FBUixDQUFZRSxVQUE5RSxJQUE0RkMsT0FBT0YsWUFBbkcsSUFBbUhFLE9BQU8sV0FBUCxDQUFuSCxJQUEwSUEsT0FBT0QsVUFBbEs7QUFFQSxTQUFPLG1CQUFVRSxNQUFWLENBQWlCLFVBQUNDLFdBQUQsRUFBY0MsUUFBZCxFQUEyQjtBQUMvQ0QsZ0JBQVlDLFFBQVosSUFBd0IsNEJBQWNBLFFBQWQsRUFBd0JYLFVBQXhCLENBQXhCO0FBQ0EsV0FBT1UsV0FBUDtBQUNILEdBSE0sRUFHSjtBQUNDRSw0QkFERDtBQUVDQyxpQ0FGRDtBQUdDQyxZQUFRO0FBQUEsYUFBTyx1Q0FBa0JkLFdBQVdlLEdBQTdCLFNBQW1DQSxHQUFuQyxHQUEwQ2YsVUFBMUMsQ0FBUDtBQUFBLEtBSFQ7QUFJQ2dCLGVBQVcsbUJBQUNELEdBQUQsRUFBTUUsT0FBTjtBQUFBLGFBQWtCLHdCQUFhRixHQUFiLEVBQWtCRSxPQUFsQixFQUEyQmpCLFVBQTNCLDBCQUFsQjtBQUFBO0FBSlosR0FISSxDQUFQO0FBU0gsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby1wcm9jZXNzLWVudjogMCAqL1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCBlbmRwb2ludHMgZnJvbSAnLi9lbmRwb2ludHMnO1xuaW1wb3J0IGdldEltYWdlIGZyb20gJy4vZ2V0LWltYWdlJztcbmltcG9ydCBnZXRTY3JvbGxBbGwgZnJvbSAnLi9zY3JvbGwtYWxsJztcbmltcG9ydCBnZXRUYWdOdW1iZXIgZnJvbSAnLi90YWctbnVtYmVyJztcbmltcG9ydCBwYXJzZUVuZHBvaW50IGZyb20gJy4vcGFyc2UtZW5kcG9pbnQnO1xuaW1wb3J0IHBlcmZvcm1SZXF1ZXN0IGZyb20gJy4vcGVyZm9ybS1yZXF1ZXN0JztcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBJR0RCIEFQSSBvYmplY3QsIHBvcHVsYXRlZCB3aXRoIG1ldGhvZHMgZm9yIGFsbCBkZWZpbmVkIGVuZHBvaW50cy5cbiAqIEBhcmcge3N0cmluZ30gW2FwaUtleV1cbiAqIEBhcmcge2Jvb2x9IFtzdGFnaW5nXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXBpS2V5ID0+IHtcbiAgICBjb25zdCBhcGlTZXJ2aWNlID0gY29uZmlnLnRocmVlU2NhbGU7XG5cbiAgICBhcGlTZXJ2aWNlLmtleSA9IGFwaUtleSB8fCBwcm9jZXNzLmVudi5JR0RCX0FQSV9LRVkgfHwgcHJvY2Vzcy5lbnZbJzNzY2FsZUtleSddIHx8IHByb2Nlc3MuZW52Lm1hc2hhcGVLZXkgfHwgZ2xvYmFsLklHREJfQVBJX0tFWSB8fCBnbG9iYWxbJzNzY2FsZUtleSddIHx8IGdsb2JhbC5tYXNoYXBlS2V5O1xuXG4gICAgcmV0dXJuIGVuZHBvaW50cy5yZWR1Y2UoKGVuZHBvaW50T2JqLCBlbmRwb2ludCkgPT4ge1xuICAgICAgICBlbmRwb2ludE9ialtlbmRwb2ludF0gPSBwYXJzZUVuZHBvaW50KGVuZHBvaW50LCBhcGlTZXJ2aWNlKTtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50T2JqO1xuICAgIH0sIHtcbiAgICAgICAgaW1hZ2U6IGdldEltYWdlLFxuICAgICAgICB0YWdOdW1iZXI6IGdldFRhZ051bWJlcixcbiAgICAgICAgc2Nyb2xsOiB1cmwgPT4gcGVyZm9ybVJlcXVlc3QoYCR7YXBpU2VydmljZS51cmx9JHt1cmx9YCwgYXBpU2VydmljZSksXG4gICAgICAgIHNjcm9sbEFsbDogKHVybCwgb3B0aW9ucykgPT4gZ2V0U2Nyb2xsQWxsKHVybCwgb3B0aW9ucywgYXBpU2VydmljZSwgcGVyZm9ybVJlcXVlc3QpXG4gICAgfSk7XG59O1xuXG5leHBvcnQge1xuICAgIGNvbmZpZ1xufTtcbiJdfQ==