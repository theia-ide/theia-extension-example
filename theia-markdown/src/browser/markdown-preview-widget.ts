/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Resource } from '@theia/core';
import { BaseWidget } from '@theia/core/lib/browser';

export class MarkdownPreviewWidget extends BaseWidget {

    constructor(
        resource: Resource
    ) {
        super();
        resource.readContents().then(html => {
            this.node.innerHTML = html
            this.update();
        });
    }

}
