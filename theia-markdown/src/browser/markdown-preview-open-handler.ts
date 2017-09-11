/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from 'inversify';
import URI from '@theia/core/lib/common/uri';
import { ResourceProvider, Resource } from '@theia/core/lib/common';
import { OpenHandler, FrontendApplication } from '@theia/core/lib/browser';
import { MarkdownUri } from './markdown-uri';
import { MarkdownPreviewWidget } from './markdown-preview-widget';

@injectable()
export class MarkdownPreviewOpenHandler implements OpenHandler {

    readonly id = 'markdown.openPreview';
    readonly label = 'Markdown: Open Preview';

    protected widgetSequence = 0;
    protected readonly widgets = new Map<string, Promise<MarkdownPreviewWidget>>();

    @inject(FrontendApplication)
    protected readonly app: FrontendApplication;

    @inject(MarkdownUri)
    protected readonly markdownUri: MarkdownUri;

    @inject(ResourceProvider)
    protected readonly resourceProvider: ResourceProvider;

    canHandle(uri: URI): number {
        return !!this.markdownUri.to(uri) ? 200 : 0;
    }

    async open(uri: URI): Promise<MarkdownPreviewWidget | undefined> {
        const widget = await this.getWidget(uri);
        this.app.shell.activateMain(widget.id);
        return widget;
    }

    protected getWidget(uri: URI): Promise<MarkdownPreviewWidget> {
        const widget = this.widgets.get(uri.toString());
        if (widget) {
            return widget;
        }
        const markdownUri = this.markdownUri.to(uri);
        const promise = this.resourceProvider(markdownUri).then(resource =>
            this.createWidget(uri, resource)
        );
        this.widgets.set(uri.toString(), promise);
        return promise;
    }

    protected createWidget(uri: URI, resource: Resource): MarkdownPreviewWidget {
        const widget = new MarkdownPreviewWidget(resource);
        widget.id = `markdown-preview-` + this.widgetSequence++;
        widget.title.label = `Preview '${uri.path.base}'`;
        widget.title.caption = widget.title.label;
        widget.title.closable = true;
        this.app.shell.addToMainArea(widget);
        return widget;
    }

}
