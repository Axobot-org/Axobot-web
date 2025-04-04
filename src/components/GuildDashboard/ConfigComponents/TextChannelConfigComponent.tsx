import { PopulatedOption } from "../../../repository/types/guild";
import { TextChannelOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import TextChannelPicker from "./shared/TextChannelPicker";


interface TextChannelConfigComponentProps {
  optionId: string;
  option: PopulatedOption<TextChannelOptionRepresentation>;
}

export default function TextChannelConfigComponent({ optionId, option }: TextChannelConfigComponentProps) {
  return (
    <SimpleConfiguration optionId={optionId}>
      <TextChannelPicker optionId={optionId} option={option} />
    </SimpleConfiguration>
  );
}
