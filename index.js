/**
 * @file theme支持插件
 * @author mfylee@me.com
 * @since 2017-08-01
 */
const {existsSync} = require('fs');
/**
 * @class
 * @param {Object} options
 * options.rule {RegExp} 入口规则：如：/^@theme/
 * options.path {string} 主题包目录，绝对路径
 * options.themes {Array} 可配置主题, [process.env.npm_config_theme, 'default']
 * @constructor
 */
function ThemeResolverWebpackPlugin(options) {
    this.options = options;
}

const exts = ['', '.js', '.vue', '.json'];

ThemeResolverWebpackPlugin.prototype.apply = function (resolver) {
    let me = this;
    resolver.plugin('before-new-resolve', function (request, finalCallback) {
        if (me.options.rule.test(request.request)) {
            for (let i in me.options.themes) {
                let theme = me.options.themes[i];
                let file = request.request.replace(me.options.rule, `${me.options.path}/${theme}`);
                for (let j = 0; j < exts.length; j++) {
                    let ext = exts[j];
                    let tmp = file + ext;
                    if (existsSync(tmp)) {
                        request.request = tmp;
                        return this.doResolve('parsed-resolve', request, `found file: ${file}`, finalCallback);
                    }
                }
            }
        }
        return finalCallback();
    });
};

module.exports = ThemeResolverWebpackPlugin;

