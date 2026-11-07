/** All application shortcuts, flattened in the same order used by Settings. */
export declare const SHORTCUT_SCHEMA: readonly ({
    id: 'add_selection_to_chat';
    defaultBinding: 'mod+l';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.add_selection_to_chat.label';
    category: 'session';
} | {
    id: 'focus_input';
    defaultBinding: 'mod+i';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.focus_input.label';
    category: 'session';
} | {
    id: 'open_timeline_dialog';
    defaultBinding: 'mod+k t';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_timeline_dialog.label';
    category: 'session';
} | {
    id: 'new_chat';
    defaultBinding: 'mod+n';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.new_chat.label';
    category: 'session';
} | {
    id: 'switch_session_previous';
    defaultBinding: 'mod+alt+arrowleft';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.switch_session_previous.label';
    category: 'session';
} | {
    id: 'switch_session_next';
    defaultBinding: 'mod+alt+arrowright';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.switch_session_next.label';
    category: 'session';
} | {
    id: 'open_next_attention_session';
    defaultBinding: 'mod+k j';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_next_attention_session.label';
    category: 'session';
} | {
    id: 'session_history_back';
    defaultBinding: 'mod+[';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.session_history_back.label';
    category: 'session';
} | {
    id: 'session_history_forward';
    defaultBinding: 'mod+]';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.session_history_forward.label';
    category: 'session';
} | {
    id: 'rename_current_session';
    defaultBinding: 'mod+k r';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.rename_current_session.label';
    category: 'session';
} | {
    id: 'archive_current_session';
    defaultBinding: 'mod+k backspace';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.archive_current_session.label';
    category: 'session';
} | {
    id: 'toggle_permission_auto_accept';
    defaultBinding: 'mod+k a';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_permission_auto_accept.label';
    category: 'session';
} | {
    id: 'close_session_tab';
    defaultBinding: 'alt+w';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.close_session_tab.label';
    category: 'session';
} | {
    id: 'open_draft_project_picker';
    defaultBinding: 'mod+k p';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_draft_project_picker.label';
    category: 'session';
} | {
    id: 'open_draft_worktree_picker';
    defaultBinding: 'mod+k g';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_draft_worktree_picker.label';
    category: 'session';
} | {
    id: 'open_session_list';
    defaultBinding: 'mod+k l';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_session_list.label';
    category: 'session';
} | {
    id: 'new_chat_worktree';
    defaultBinding: 'mod+shift+n';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.new_chat_worktree.label';
    category: 'session';
} | {
    id: 'new_mini_chat';
    defaultBinding: 'mod+alt+n';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.new_mini_chat.label';
    category: 'session';
} | {
    id: 'expand_input';
    defaultBinding: 'mod+shift+e';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.expand_input.label';
    category: 'session';
} | {
    id: 'toggle_dictation';
    defaultBinding: 'mod+alt+v';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_dictation.label';
    category: 'session';
} | {
    id: 'abort_run';
    defaultBinding: 'escape';
    customizable: false;
    category: 'session';
} | {
    id: 'background_session_work';
    defaultBinding: 'mod+shift+b';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.background_session_work.label';
    category: 'session';
} | {
    id: 'open_model_selector';
    defaultBinding: 'mod+shift+m';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_model_selector.label';
    category: 'models';
} | {
    id: 'cycle_thinking_variant';
    defaultBinding: 'mod+shift+t';
    customizable: false;
    category: 'models';
} | {
    id: 'cycle_agent';
    defaultBinding: 'tab';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.cycle_agent.label';
    category: 'models';
} | {
    id: 'cycle_favorite_model_forward';
    defaultBinding: 'ctrl+alt+]';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.cycle_favorite_model_forward.label';
    category: 'models';
} | {
    id: 'cycle_favorite_model_backward';
    defaultBinding: 'ctrl+alt+[';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.cycle_favorite_model_backward.label';
    category: 'models';
} | {
    id: 'toggle_terminal';
    defaultBinding: 'mod+j';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_terminal.label';
    category: 'panels';
} | {
    id: 'toggle_terminal_expanded';
    defaultBinding: 'mod+shift+j';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_terminal_expanded.label';
    category: 'panels';
} | {
    id: 'toggle_sidebar';
    defaultBinding: 'mod+b';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_sidebar.label';
    category: 'panels';
} | {
    id: 'toggle_source_board';
    defaultBinding: 'mod+k b';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_source_board.label';
    category: 'panels';
} | {
    id: 'toggle_prompt_navigator';
    defaultBinding: 'mod+k n';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_prompt_navigator.label';
    category: 'panels';
} | {
    id: 'switch_session_tab';
    defaultBinding: 'mod';
    prefixStyle: true;
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.switch_session_tab.label';
    category: 'panels';
} | {
    id: 'switch_context_surface';
    defaultBinding: 'mod+alt';
    prefixStyle: true;
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.switch_context_surface.label';
    category: 'panels';
} | {
    id: 'toggle_services_menu';
    defaultBinding: 'mod+k i';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.toggle_services_menu.label';
    category: 'panels';
} | {
    id: 'save_file';
    defaultBinding: 'mod+s';
    customizable: false;
    category: 'navigation';
} | {
    id: 'find_in_file';
    defaultBinding: 'mod+f';
    customizable: false;
    category: 'navigation';
} | {
    id: 'open_go_to_line';
    defaultBinding: 'alt+g';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_go_to_line.label';
    category: 'navigation';
} | {
    id: 'open_document_symbols';
    defaultBinding: 'mod+shift+o';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_document_symbols.label';
    category: 'navigation';
} | {
    id: 'open_command_palette';
    defaultBinding: 'mod+p';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_command_palette.label';
    category: 'application';
} | {
    id: 'open_settings';
    defaultBinding: 'mod+comma';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_settings.label';
    category: 'application';
} | {
    id: 'open_help';
    defaultBinding: 'mod+k h';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_help.label';
    category: 'application';
} | {
    id: 'open_project_actions';
    defaultBinding: 'mod+alt+r';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.open_project_actions.label';
    category: 'application';
} | {
    id: 'cycle_theme';
    defaultBinding: 'mod+k c';
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.cycle_theme.label';
    category: 'application';
} | {
    id: 'mini_chat_global';
    defaultBinding: string;
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.mini_chat_global.label';
    category: 'desktop';
} | {
    id: 'quake_mode_global';
    defaultBinding: string;
    customizable: true;
    settingsLabelKey: 'settings.openchamber.keyboardShortcuts.action.quake_mode_global.label';
    category: 'desktop';
})[];
