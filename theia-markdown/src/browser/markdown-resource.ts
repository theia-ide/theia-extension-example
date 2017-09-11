/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from "inversify";
import { ResourceResolver, Resource } from "@theia/core";
import URI from "@theia/core/lib/common/uri";
import { FileSystem } from '@theia/filesystem/lib/common';
import { MarkdownUri } from "./markdown-uri";

import markdownIt = require("markdown-it");

export class MarkdownResource implements Resource {

    constructor(
        public readonly uri: URI,
        protected readonly resourceUri: URI,
        protected readonly fileSystem: FileSystem
    ) { }

    async readContents(options?: { encoding?: string | undefined; }): Promise<string> {
        const fileStat = await this.fileSystem.resolveContent(this.resourceUri.toString(), options);
        return this.render(fileStat.content);
    }

    protected render(md: string): string {
        return markdownIt({
            html: true
        }).render(md);
    }

}

@injectable()
export class MarkdownResourceResolver implements ResourceResolver {

    @inject(FileSystem)
    protected readonly fileSystem: FileSystem;

    @inject(MarkdownUri)
    protected readonly markdownUri: MarkdownUri;

    async resolve(uri: URI): Promise<MarkdownResource> {
        const resourceUri = this.markdownUri.from(uri);
        return new MarkdownResource(uri, resourceUri, this.fileSystem);
    }

}
