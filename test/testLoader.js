/*
 * testloader.js - test the character type information functions
 *
 * Copyright © 2022 JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ilibEnv = require("ilib-env");
if (typeof(LoaderFactory) === "undefined") {
    var index = require("../lib/index.js");
    var LoaderFactory = index.default;
    var registerLoader = index.registerLoader;
    var MockLoader = require("../lib/MockLoader.js");
}

module.exports.testLoader = {
    testLoaderGetName: function(test) {
        test.expect(1);
        ilibEnv.setPlatform("nodejs");
        var loader = LoaderFactory();
        test.equal(loader.getName(), "Nodejs Loader");
        test.done();
    },

    testLoaderSupportsSync: function(test) {
        test.expect(1);
        ilibEnv.setPlatform("nodejs");
        var loader = LoaderFactory();
        test.ok(loader.supportsSync());
        test.done();
    },

    testLoadFileSync: function(test) {
        test.expect(2);
        registerLoader(MockLoader);
        ilibEnv.setPlatform("mock");

        var loader = LoaderFactory();
        test.equal(loader.getName(), "Mock Loader");

        var content = loader.loadFile("foobar.json", {sync: true});
        test.equal(content, "foobar.json");
        test.done();
    },

    testLoadFileAsync: function(test) {
        test.expect(2);
        registerLoader(MockLoader);
        ilibEnv.setPlatform("mock");

        var loader = LoaderFactory();
        test.equal(loader.getName(), "Mock Loader");

        var promise = loader.loadFile("foobar.json", {sync: false});
        promise.then(function(content) {
            test.equal(content, "foobar.json");
            test.done();
        });
    },

    testLoadFileAsyncDefault: function(test) {
        test.expect(2);
        registerLoader(MockLoader);
        ilibEnv.setPlatform("mock");

        var loader = LoaderFactory();
        test.equal(loader.getName(), "Mock Loader");

        var promise = loader.loadFile("foobar.json");
        promise.then(function(content) {
            test.equal(content, "foobar.json");
            test.done();
        });
    },

    testLoadFilesSync: function(test) {
        test.expect(2);
        registerLoader(MockLoader);
        ilibEnv.setPlatform("mock");

        var loader = LoaderFactory();
        test.equal(loader.getName(), "Mock Loader");

        var content = loader.loadFiles([
            "foobar.json",
            "asdf.json",
            "blah.json"
        ], {sync: true});
        test.equalIgnoringOrder(content, [
            "foobar.json",
            "asdf.json",
            "blah.json"
        ]);
        test.done();
    },

    testLoadFilesAsync: function(test) {
        test.expect(2);
        registerLoader(MockLoader);
        ilibEnv.setPlatform("mock");

        var loader = LoaderFactory();
        test.equal(loader.getName(), "Mock Loader");

        var promise = loader.loadFiles([
            "foobar.json",
            "asdf.json",
            "blah.json"
        ], {sync: false});
        promise.then(function(content) {
            test.equalIgnoringOrder(content, [
                "foobar.json",
                "asdf.json",
                "blah.json"
            ]);
            test.done();
        });
    },

};
