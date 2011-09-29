#!/bin/bash

OUT="bootstrap-ender.js"
SOURCES="bootstrap-alerts.js bootstrap-dropdown.js bootstrap-modal.js bootstrap-tabs.js bootstrap-twipsy.js bootstrap-popover.js bootstrap-scrollspy.js"
HEAD="_ender_head.js"
FOOT="_ender_foot.js"

cat $HEAD > $OUT
for i in $SOURCES; do
	cat $i >> $OUT
	echo "" >> $OUT
done
cat $FOOT >> $OUT
