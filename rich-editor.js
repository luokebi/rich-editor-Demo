window.onload = function(){
console.log("init");
	var editor = document.createElement('div');
	editor.id = 'editor';
	editor.innerHTML = '<ul unselectable="on">'+
	                   '<li unselectable="on" onselectstart="return false;"  id="Bold">Bold</li>'+
					   '<li unselectable="on" id="Italic">Italic</li>'+
					   '<li unselectable="on" id="Underline">Underline</li>'+
					   '<li unselectable="on" id="ForeColor">font-color(red)</li>'+
					   '<li unselectable="on" id="BackColor">back-color(blue)</li>'+
					   '<li unselectable="on" id="BackColor2">back-color(white)</li>'+
					   '<li unselectable="on" id="FontSize18">font-size(18)</li>'+
					   '<li unselectable="on" id="FontSize12">font-size(12)</li>'+
					   '<li unselectable="on" id="FontName">Font</li>'+
					   '<li>insert image</li>'+
					   '<li>link</li>'+
					   '</ul>'+
					   '<div id="bar">'+
					   '<span>showContent:</span>'+
					   '<input id="showContent" type="text">'+
					   '<span>linkURL:</span>'+
					   '<input id="linkURL" type="text">'+
					   '<input type="button" id="createLink" value="confirm">'+
					    '<input type="button" id="cancel" value="cancel">'+
					   '</div>'+
					   '<iframe id="editorContent" frameborder="0" style="padding: 5px;"></iframe>'+
					   '<p>html:</p>'+
					   '<textarea id="output"></textarea>';
					   
	document.body.appendChild(editor);
	var editWin = document.getElementById("editorContent").contentWindow
	var editDoc = document.getElementById("editorContent").contentWindow.document;
	editDoc.designMode = "on";
	editDoc.write("<html><head></head><body style='margin:0px; padding: 0px;'><br></body></html>");
    editDoc.body.focus();
	
	//envet
	var toolbar = editor.childNodes[0];
	toolbar.childNodes[0].onclick = function()
    {
       switchSelectedState(this);
       editDoc.execCommand("Bold", false, null);
    }

	toolbar.childNodes[1].onclick = function()
	{
		switchSelectedState(this);
		editDoc.execCommand("Italic", false, null);

	}

	toolbar.childNodes[2].onclick = function()
	{
		switchSelectedState(this);
		editDoc.execCommand("Underline", false, null);

		
	}
	toolbar.childNodes[3].onclick = function()
	{
		//switchSelectedState(this);
		editDoc.execCommand("ForeColor",false,'red');

	}
	toolbar.childNodes[4].onclick = function()
	{
		//switchSelectedState(this);
		editDoc.execCommand("backColor",false,'blue');

	}
	toolbar.childNodes[5].onclick = function()
	{
		//switchSelectedState(this);
		editDoc.execCommand("backColor",false,'white');

	}
	toolbar.childNodes[6].onclick = function()
	{
		//switchSelectedState(this);
		editDoc.execCommand("FontSize",false,'7');

	}
	toolbar.childNodes[7].onclick = function()
	{
		//switchSelectedState(this);
		editDoc.execCommand("FontSize",false,'3');

	}

	toolbar.childNodes[9].onclick = function()
	{
		var html = '<img src="http://www.baidu.com/img/baidu_sylogo1.gif">';
		insertHTML(html);
	}

	toolbar.childNodes[10].onclick = function()
	{
		document.getElementById('bar').style.display = 'block';
	
	}
    var confirm = document.getElementById('createLink');
	EventUtil.addhandler(confirm,'click',function(){
		var showContent = document.getElementById('showContent').value;
		var linkURL = document.getElementById('linkURL').value;
		var html = '<span><a href="'+linkURL+'">'+showContent+'</a></span>';
		insertHTML(html);
		document.getElementById('showContent').value = '';
		document.getElementById('linkURL').value = '';
		this.parentNode.style.display = 'none';
	});

	var cancel = document.getElementById('cancel');
	EventUtil.addhandler(cancel,'click',function(){
		this.parentNode.style.display = 'none';
		document.getElementById('showContent').value = '';
		document.getElementById('linkURL').value = '';
	});		
		 
		 
	function updateContent() {
		var a = editDoc.body.innerHTML;
		var b = document.getElementById('output');
		b.value = a;
	}
	
	EventUtil.addhandler(toolbar,'mousedown',function(envet){
		EventUtil.preventDefault(envet);

	});
	
	EventUtil.addhandler(editDoc,'mouseup',updateState);
	EventUtil.addhandler(editDoc,'keyup',updateState);
	EventUtil.addhandler(editDoc,'keyup',updateContent);
	EventUtil.addhandler(editDoc,'keypress',changeDiv);

	var states = ['Bold','Italic','Underline'];
	var states2 = ['ForeColor','backColor','FontSize'];

	function updateState(){
		//console.log("kjsdfk");
		states.map(function(type){
			//console.log(type+editDoc.queryCommandState(type));
			var state = editDoc.queryCommandState(type);
			var elem = document.getElementById(type);
			if(state){
				elem.className = 'selected';
			}
			else{
				elem.className = '';
			}
		});

		states2.map(function(type){
			var value = editDoc.queryCommandValue(type);
			//console.log(editDoc.queryCommandValue('IDM_BACKCOLOR'));
			var elem = document.getElementById(type);
		

		});

		
		}

	function changeDiv(e){
		if(e.keyCode == 13){
			e.preventDefault();
			if(editWin.getSelection){
				var sel = editWin.getSelection();
				var range = sel.getRangeAt(0);
				br = document.createElement('br');
				br2 = document.createElement('br');
				range.deleteContents();
				range.insertNode(br);
				//range.insertNode(br2);
				range.setStartAfter(br);
                range.setEndAfter(br);
				range.collapse(false);
				sel.removeAllRanges();
				sel.addRange(range);
				return false;
			}
		}


	}


	function switchSelectedState(elem){
		if(elem.className == 'selected'){
			elem.className = '';
		}
		else{
			elem.className = 'selected'; 
		}
	}

	function insertHTML(html) {
    var sel, range;
    if (editWin.getSelection) {
        // IE9 and non-IE
        sel = editWin.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            
            var el = editDoc.createElement("div");
            el.innerHTML = html;
            var frag = editDoc.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (editDoc.selection && editDoc.selection.type != "Control") {
        // IE < 9
        editDoc.selection.createRange().pasteHTML(html);
    }
    updateContent();
}

	
	
	
}
		 
   
		
		
		
		
					   
	
