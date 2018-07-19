"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boldCommand_1 = require("./boldCommand");
exports.boldCommand = boldCommand_1.boldCommand;
var codeCommand_1 = require("./codeCommand");
exports.codeCommand = codeCommand_1.codeCommand;
var headerCommand_1 = require("./headerCommand");
exports.headerCommand = headerCommand_1.headerCommand;
var imageCommand_1 = require("./imageCommand");
exports.imageCommand = imageCommand_1.imageCommand;
var italicCommand_1 = require("./italicCommand");
exports.italicCommand = italicCommand_1.italicCommand;
var strikethroughCommand_1 = require("./strikethroughCommand");
exports.strikethroughCommand = strikethroughCommand_1.strikethroughCommand;
var linkCommand_1 = require("./linkCommand");
exports.linkCommand = linkCommand_1.linkCommand;
var orderedCommand_1 = require("./orderedCommand");
exports.orderedListCommand = orderedCommand_1.orderedListCommand;
var quoteCommand_1 = require("./quoteCommand");
exports.quoteCommand = quoteCommand_1.quoteCommand;
var unorderedListCommand_1 = require("./unorderedListCommand");
exports.unorderedListCommand = unorderedListCommand_1.unorderedListCommand;
var checkListCommand_1 = require("./checkListCommand");
exports.checkListCommand = checkListCommand_1.checkListCommand;
var tabCommand_1 = require("./tabCommand");
exports.tabCommand = tabCommand_1.tabCommand;
var getDefaultCommands = function () { return [
    [headerCommand_1.headerCommand, boldCommand_1.boldCommand, italicCommand_1.italicCommand, strikethroughCommand_1.strikethroughCommand],
    [linkCommand_1.linkCommand, quoteCommand_1.quoteCommand, codeCommand_1.codeCommand, imageCommand_1.imageCommand],
    [unorderedListCommand_1.unorderedListCommand, orderedCommand_1.orderedListCommand, checkListCommand_1.checkListCommand],
]; };
exports.getDefaultCommands = getDefaultCommands;
