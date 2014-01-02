test:
	NODE_ENV=test ./node_modules/mocha/bin/mocha --reporter spec \
		--bail \
		--harmony-generators \
		spec/service_spec

.PHONY: test