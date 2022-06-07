INPUT_DIR=./src
OUTPUT_DIR=./dist
OUTPUT_DIR_UNMINIFIED=./dist-unminified
EMCC_OPTS=-O3 -s NO_DYNAMIC_EXECUTION=1 -s NO_FILESYSTEM=1
DEFAULT_EXPORTS:='_malloc','_free'

LIBAAC_ENCODER_SRC=$(INPUT_DIR)/encoderWorker.js
LIBAAC_ENCODER_MIN=$(OUTPUT_DIR)/encoderWorker.min.js
LIBAAC_ENCODER=$(OUTPUT_DIR_UNMINIFIED)/encoderWorker.js
LIBAAC_DIR=./fdk-aac
LIBAAC_OBJ=$(LIBAAC_DIR)/.libs/libfdk-aac.a
LIBAAC_ENCODER_EXPORTS:='_aacEncOpen','_aacEncoder_SetParam','_aacEncInfo','_aacEncEncode'

AAC_ENCODER_MIN=$(OUTPUT_DIR)/aac-encoder.min.js
AAC_ENCODER=$(OUTPUT_DIR_UNMINIFIED)/aac-encoder.js
AAC_ENCODER_SRC=$(INPUT_DIR)/encoder.js

default: $(LIBAAC_ENCODER) $(LIBAAC_ENCODER_MIN) $(LIBAAC_DECODER_MIN) $(AAC_ENCODER) $(AAC_ENCODER_MIN)

cleanDist:
	rm -rf $(OUTPUT_DIR) $(OUTPUT_DIR_UNMINIFIED)
	mkdir $(OUTPUT_DIR)
	mkdir $(OUTPUT_DIR_UNMINIFIED)

cleanAll: cleanDist
	rm -rf $(LIBAAC_DIR) $(LIBSPEEXDSP_DIR)

test:
	# Tests need to run relative to `dist` folder for wasm file import
	cd $(OUTPUT_DIR); node --expose-wasm ../test.js

.PHONY: test

$(LIBAAC_DIR)/autogen.sh:
	git submodule update --init

$(LIBAAC_OBJ): $(LIBAAC_DIR)/autogen.sh
	cd $(LIBAAC_DIR); ./autogen.sh
	cd $(LIBAAC_DIR); emconfigure ./configure
	cd $(LIBAAC_DIR); emmake make

$(LIBAAC_ENCODER): $(LIBAAC_ENCODER_SRC) $(LIBAAC_OBJ)
	emcc -o $@ $(EMCC_OPTS) -s BINARYEN_ASYNC_COMPILATION=0 -s SINGLE_FILE=1 -g3 -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBAAC_ENCODER_EXPORTS)]" --post-js $(LIBAAC_ENCODER_SRC) $(LIBAAC_OBJ)

$(LIBAAC_ENCODER_MIN): $(LIBAAC_ENCODER_SRC) $(LIBAAC_OBJ)
	emcc -o $@ $(EMCC_OPTS) -s BINARYEN_ASYNC_COMPILATION=0 -s SINGLE_FILE=1 -s EXPORTED_FUNCTIONS="[$(DEFAULT_EXPORTS),$(LIBAAC_ENCODER_EXPORTS)]" --post-js $(LIBAAC_ENCODER_SRC) $(LIBAAC_OBJ)

$(AAC_ENCODER): $(AAC_ENCODER_SRC)
	npm run webpack -- --config webpack.config.js -d --output-library AACEncoder $(AAC_ENCODER_SRC) -o $@

$(AAC_ENCODER_MIN): $(AAC_ENCODER_SRC)
	npm run webpack -- --config webpack.config.js -p --output-library AACEncoder $(AAC_ENCODER_SRC) -o $@
