{{if body}}
<div class="first-title">
    <h3>{{#body}}</h3>
</div>
{{/if}}
<ul class="chooses">
{{if type == 4}}
    <li class="clearFix" data-value="1">
        <div class="choose-mark">√</div>
        <div class="choose-content">正确</div>
    </li>
    <li class="clearFix" data-value="0">
        <div class="choose-mark">X</div>
        <div class="choose-content">错误</div>
    </li>
{{else}}
{{each subjectItems}}
<li class="clearFix" data-value="{{$value.value}}">
    <div class="choose-mark">{{$value.value}}</div>
<div class="choose-content">{{#$value.content}}</div>
</li>
{{/each}}
{{/if}}
</ul>