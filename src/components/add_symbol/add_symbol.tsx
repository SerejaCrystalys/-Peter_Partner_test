import apiCtx from "@/ctx/ctx";
import useDebouncedValue from "@/hooks/debounce";
import { Button, Dropdown, Input, MenuProps, Modal } from "antd";
import { ChangeEvent, useContext, useEffect, useState } from "react";

const AddSymbolButton = ({
  symbols,
  setSymbols,
}: {
  symbols: string[];
  setSymbols: (value: string[]) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [gettedSymbol, setGettedSymbol] = useState("");
  const [items, setItems] = useState<MenuProps["items"]>([]);

  const api = useContext(apiCtx);
  const debounceValue = useDebouncedValue(inputValue, 100);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (!debounceValue) return;

    api.get.search(inputValue).then((data) => {
      if (data) {
        console.log(data);

        setItems(
          data.result.map((item: SearchData, index: number) => {
            return {
              key: index,
              label: (
                <div
                  onClick={() => {
                    setInputValue(item.displaySymbol);
                    setGettedSymbol(item.symbol);
                  }}
                >
                  {item.displaySymbol}
                </div>
              ),
            };
          })
        );
      }
    });
  }, [debounceValue]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSymbols([...symbols, gettedSymbol]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="self-center mt-5" onClick={showModal}>
        Add symbol
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Dropdown
          menu={{ items }}
          trigger={["click", "hover"]}
          overlayStyle={{
            paddingTop: "8px",
          }}
        >
          <Input
            className="self-center font-bold  "
            placeholder="input search text"
            allowClear
            value={inputValue}
            onChange={onInput}
            style={{
              width: 400,
              // height
            }}
          />
        </Dropdown>
      </Modal>
    </>
  );
};

export default AddSymbolButton;
