import { TextChannelOptionRepresentation } from "../../../repository/types/guild-config-types";
import { SimpleConfiguration } from "./shared/SharedConfigComponents";
import TextChannelPicker from "./shared/TextChannelPicker";


interface TextChannelConfigComponentProps {
  optionId: string;
  option: TextChannelOptionRepresentation & {value: unknown};
  guildId: string;
}

export default function TextChannelConfigComponent({ optionId, option, guildId }: TextChannelConfigComponentProps) {
  return (
    <SimpleConfiguration optionId={optionId}>
      <TextChannelPicker optionId={optionId} option={option} guildId={guildId} />
    </SimpleConfiguration>
  );
}
