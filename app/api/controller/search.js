function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
//TODO 在后台搜索那里完善，采用专门的搜索开发库
module.exports = class extends Base {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            // 取出输入框默认的关键词
            let userId = _this.getLoginUserId();;
            const defaultKeyword = yield _this.model('keywords').where({
                is_default: 1
            }).limit(1).find();
            // 取出热闹关键词
            const hotKeywordList = yield _this.model('keywords').distinct('keyword').field(['keyword', 'is_hot']).limit(10).select();
            const historyKeywordList = yield _this.model('search_history').distinct('keyword').where({
                user_id: userId
            }).limit(10).getField('keyword');
            return _this.success({
                defaultKeyword: defaultKeyword,
                historyKeywordList: historyKeywordList,
                hotKeywordList: hotKeywordList
            });
        })();
    }
    helperAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const keyword = _this2.get('keyword');
            const keywords = yield _this2.model('keywords').distinct('keyword').where({
                keyword: ['like', keyword + '%']
            }).getField('keyword', 10);
            return _this2.success(keywords);
        })();
    }
    clearHistoryAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            let userId = _this3.getLoginUserId();;
            yield _this3.model('search_history').where({
                user_id: userId
            }).delete();
            return _this3.success();
        })();
    }
};
//# sourceMappingURL=search.js.map