import React from 'react';
import parse from 'html-react-parser';
import getAllWidgates from '../Libary/getAllwidgets';

export default async function SidebarComponent() {
    const widgate = await getAllWidgates();

    return (
        <aside className="sidebar">
            {widgate.map((widget) => {
                let renderedContent = widget.rendered;

                if (widget.id === 'block-3') {
                    renderedContent = renderedContent.replace(/href="https:\/\/financeblogs\.mohammadasifhossain\.site/g, 'href="/post');
                }
                if (widget.id === 'block-6') {
                    renderedContent = renderedContent.replace(/href="https:\/\/financeblogs\.mohammadasifhossain\.site(\/[^\s"]*)/g, 'href="$1');
                }
                

                switch (widget.id) {
                    case 'block-6':
                        return <ul className='wwidget_categories' key={widget.id}>{parse(renderedContent)}</ul>;
                    case 'block-3':
                        return <ul className='widget_recent_entries' key={widget.id}>{parse(renderedContent)}</ul>;
                    default:
                        return <ul key={widget.id}>{parse(renderedContent)}</ul>;
                }
            })}
        </aside>
    );
};
