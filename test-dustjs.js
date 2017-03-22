dust = dust || {};
dust.isDebug = true;

require(['https://cdn.rawgit.com/linkedin/dustjs/v2.2.3/lib/compiler.js', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js'], function() {
    require(['ace/ace'], function(ace) {
        var test = test || {};
        test.dust = function(tpl, data, callback) {
            return dust.renderSource(tpl, data, function(error, out) {
                callback(error, out);
            });
        };

        $('body').empty().append(`
              <div style="display: flex;width: 100%">
              <div style="flex: 1">
                <div class="title">dust:</div>
                <div><div id="code" style="width: 100%;height: 400px;"></div></div>
                <div class="title">data:</div>
                <div><div id="data" style="width: 100%;height: 400px;">{}</div></div>
              </div>
              <div style="flex: 1" class="right">
                 <button id="run">run test</button>
                 <br/>
                <div class="title">result:</div>
                <div id="result"></div>
              </div>
          `);

        var codeEditor = ace.edit("code");
        codeEditor.setTheme("ace/theme/monokai");
        codeEditor.getSession().setMode("ace/mode/html");
        codeEditor.setValue(window.localStorage.getItem('B_dustjs-test-code') || '');

        var dataEditor = ace.edit("data");
        dataEditor.setTheme("ace/theme/monokai");
        dataEditor.getSession().setMode("ace/mode/json");
        dataEditor.setValue(window.localStorage.getItem('B_dustjs-test-data') || '{}');

        // append style
        $('#B-dustjs-test-style').length === 0 && $('head').append($(`<style id="B-dustjs-test-style"> </style>`));
        $('#B-dustjs-test-style').html(`
            body {
              margin: 10px;
            }
            .title {
              font-size: 20px;
              font-weight: bold;
              margin: 0 0 10px 0;
            }

            .right {
              padding: 10px;
            }

            #result {
              color: white;
              background: black;
              border-radius: 2px;
              min-height: 300px;
              padding: 10px;

            }
            select {
              height: auto;
            }`);

        $('#run').on('click', function() {
            try {
                var code = codeEditor.getValue();
                var result;
                var data = dataEditor.getValue();
                window.localStorage.setItem('B_dustjs-test-code', code);
                window.localStorage.setItem('B_dustjs-test-data', data);
                data = JSON.parse(data);
                test.dust(code, data, function(error, out) {
                    if (error) {
                        $('#result').html(error.toString());
                    } else {
                        $('#result').html(out.toString());
                    }
                });
            } catch (e) {
                $('#result').html(e.toString());
            }
        });
    })
});
