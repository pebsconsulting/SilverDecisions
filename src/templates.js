import *  as _ from 'lodash'
import {i18n} from './i18n/i18n'
//TODO maybe use some templating engine instead
export class Templates{


    static get(templateName){
        var compiled = _.template(Templates[templateName],{ 'imports': { 'i18n': i18n } });
        return compiled()

    }

    static toolbar =
        '<div id="toolbar">' +
            '<div class="toolbar-group">'+
                '<button id="new-diagram-button" class="icon-button" title="<%= i18n.t("toolbar.newDiagram")%>"><i class="material-icons">insert_drive_file</i></button>'+
                '<button id="open-diagram-button" class="icon-button" title="<%= i18n.t("toolbar.openDiagram")%>"><i class="material-icons">folder_open</i></button>'+
                '<button id="save-diagram-button" class="icon-button" title="<%= i18n.t("toolbar.saveDiagram")%>"><i class="material-icons">save</i></button>'+
            '</div>'+
            '<div class="toolbar-group">'+
                '<label><%= i18n.t("toolbar.export.label")%></label>'+
                '<button id="saveButton"><%= i18n.t("toolbar.export.png")%></button>'+
                '<button id="saveButtonSvg"><%= i18n.t("toolbar.export.svg")%></button>'+
            '</div>'+
            '<div class="toolbar-group">'+
                '<label><%= i18n.t("toolbar.layout.label")%></label>'+
                '<button id="treeAutoLayoutButton"><%= i18n.t("toolbar.layout.tree")%></button>'+
                '<button id="clusterAutoLayoutButton"><%= i18n.t("toolbar.layout.cluster")%></button>'+
            '</div>'+
            '<div class="toolbar-group">'+
                '<button id="undoButton" disabled="disabled" title="<%= i18n.t("toolbar.undo")%>"><i class="material-icons">undo</i></button>'+
                '<button id="redoButton" disabled="disabled" title="<%= i18n.t("toolbar.redo")%>"><i class="material-icons">redo</i></button>'+
            '</div>'+
        '</div>';



    static nodeProperties =
        '<div id="object-properties">' +
            '<div class="header"></div> '+
            '<div class="content"></div> '+
        '</div>';
    static sidebar =
        '<div id="sidebar">' +
            Templates.nodeProperties+
        '</div>';

    static main =
        '<div id="silver-decisions">'+
             Templates.toolbar+
            '<div id="main-region">' +
                Templates.sidebar+
                '<div id="tree-designer-container"></div>'+
            '</div>'+
            '<input type="file" style="display:none" id="sd-file-input"/>'+
        '</div>';
}




