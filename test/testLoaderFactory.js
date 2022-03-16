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

import { setPlatform } from 'ilib-env';
import LoaderFactory, { registerLoader } from '../src/index.js';
import MockLoader from './MockLoader';

const testLoaderFactory = {
    testLoaderFactoryNode: function(test) {
        test.expect(2);
        setPlatform("nodejs");
        var loader = LoaderFactory();
        test.equal(loader.getName(), "Nodejs Loader");
        test.equalIgnoringOrder(loader.getPlatforms(), ["nodejs", "webos"]);
        test.done();
    },

    testLoaderFactoryNodeAlt: function(test) {
        test.expect(2);
        registerLoader(MockLoader);
        setPlatform("mock");

        var loader = LoaderFactory();
        test.equal(loader.getName(), "Mock Loader");
        test.equalIgnoringOrder(loader.getPlatforms(), ["mock"]);
        test.done();
    },

    testLoaderFactoryNodeNone: function(test) {
        test.expect(1);
        setPlatform("foo");

        var loader = LoaderFactory();
        test.ok(!loader);
        test.done();
    }
};

export default testLoaderFactory;